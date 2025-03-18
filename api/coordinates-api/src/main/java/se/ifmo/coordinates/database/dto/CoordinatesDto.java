package se.ifmo.coordinates.database.dto;

import lombok.Value;

import java.io.Serializable;
import java.sql.Timestamp;
import java.time.OffsetDateTime;

/**
 * DTO for {@link se.ifmo.coordinates.database.model.Coordinates}
 */
@Value
public class CoordinatesDto implements Serializable {
    // todo add validations (jakarta.validation.constraints.*)
    double x;
    double y;
    double r;
    boolean result;
    OffsetDateTime timestamp;
}