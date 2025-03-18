package se.ifmo.coordinates.database.model;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.sql.Timestamp;
import java.time.OffsetDateTime;

@Table(name = "coordinates")
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Accessors(chain = true)
public class Coordinates {

    @Id
    Long id;

    @NotNull
    @Column("x")
    double x;

    @NotNull
    @Column("y")
    double y;

    @NotNull
    // todo add validations (jakarta.validation.constraints.*)
    @Column("r")
    double r;

    @NotNull
    @Column("result")
    boolean result;

    @Column("timestamp")
    OffsetDateTime timestamp;

    @Column("owner_sub")
    String ownerSub;
}
