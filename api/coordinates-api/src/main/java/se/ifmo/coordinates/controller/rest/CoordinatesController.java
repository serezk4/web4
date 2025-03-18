package se.ifmo.coordinates.controller.rest;

import se.ifmo.coordinates.controller.response.ApiResponse;
import se.ifmo.coordinates.controller.response.coordinates.CoordinatesListResponse;
import se.ifmo.coordinates.database.dto.CoordinatesDto;
import se.ifmo.coordinates.database.mapper.CoordinatesMapper;
import se.ifmo.coordinates.database.service.CoordinatesService;
import se.ifmo.coordinates.security.auth.model.CustomUserDetails;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import se.ifmo.coordinates.util.AreaChecker;

@RestController
@RequestMapping("/coordinates")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Validated
@Log4j2
public class CoordinatesController {
    CoordinatesService coordinatesService;
    CoordinatesMapper coordinatesMapper;

    @PostMapping("/check")
    public Mono<ResponseEntity<ApiResponse.Body<CoordinatesDto>>> check(
            final @RequestBody CoordinatesDto coordinatesDto,
            final @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return Mono.just(coordinatesMapper.toEntity(coordinatesDto))
                .map(coordinates -> coordinates
                        .setOwnerSub(userDetails.getSub())
                        .setResult(AreaChecker.isInsideArea(coordinates.getX(), coordinates.getY(), coordinates.getR()))
                ).flatMap(coordinatesService::save)
                .map(coordinatesMapper::toDto).map(ApiResponse::ok);
    }

    @GetMapping("/list")
    public Mono<ResponseEntity<ApiResponse.Body<CoordinatesListResponse>>> list(
            final @AuthenticationPrincipal CustomUserDetails userDetails,
            final @RequestParam("offset") long offset,
            final @RequestParam("limit") long limit
    ) {
        return coordinatesService.findAllByOwnerSub(userDetails.getSub(), offset, limit)
                .map(coordinatesMapper::toDto).collectList()
                .map(CoordinatesListResponse::new).map(ApiResponse::ok);
    }
}