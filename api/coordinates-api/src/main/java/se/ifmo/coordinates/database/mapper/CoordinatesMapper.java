package se.ifmo.coordinates.database.mapper;

import se.ifmo.coordinates.database.dto.CoordinatesDto;
import se.ifmo.coordinates.database.model.Coordinates;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface CoordinatesMapper {
    Coordinates toEntity(CoordinatesDto coordinatesDto);

    CoordinatesDto toDto(Coordinates coordinates);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Coordinates partialUpdate(CoordinatesDto coordinatesDto, @MappingTarget Coordinates coordinates);
}