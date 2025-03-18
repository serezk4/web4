package se.ifmo.coordinates.controller.response.coordinates;

import se.ifmo.coordinates.database.dto.CoordinatesDto;
import lombok.Value;

import java.util.List;

@Value
public class CoordinatesListResponse {
    List<CoordinatesDto> list;
}
