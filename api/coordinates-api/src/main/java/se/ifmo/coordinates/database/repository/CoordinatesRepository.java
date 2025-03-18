package se.ifmo.coordinates.database.repository;

import se.ifmo.coordinates.database.model.Coordinates;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface CoordinatesRepository extends ReactiveCrudRepository<Coordinates, Long> {
    @Query("SELECT * FROM coordinates ORDER BY timestamp DESC OFFSET :offset LIMIT :limit")
    Flux<Coordinates> findAll(long offset, long limit);

    @Query("SELECT * FROM coordinates WHERE owner_sub = :ownerSub ORDER BY timestamp DESC OFFSET :offset LIMIT :limit")
    Flux<Coordinates> findAllByOwnerSub(String ownerSub, long offset, long limit);
}
