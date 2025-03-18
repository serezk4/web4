package se.ifmo.coordinates.database.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import se.ifmo.coordinates.database.model.Coordinates;
import se.ifmo.coordinates.database.repository.CoordinatesRepository;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Transactional(isolation = Isolation.READ_COMMITTED, rollbackFor = Exception.class)
public class CoordinatesService {
    CoordinatesRepository coordinatesRepository;

    public Mono<Coordinates> save(final Coordinates coordinates) {
        return coordinatesRepository.save(coordinates);
    }

    public Flux<Coordinates> findAll(long offset, long limit) {
        return coordinatesRepository.findAll(offset, limit);
    }

    public Flux<Coordinates> findAllByOwnerSub(String ownerSub, long offset, long limit) {
        return coordinatesRepository.findAllByOwnerSub(ownerSub, offset, limit);
    }

    public Mono<Void> deleteAll() {
        return coordinatesRepository.deleteAll();
    }
}
