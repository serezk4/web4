CREATE TABLE coordinates
(
    id        BIGSERIAL PRIMARY KEY,
    x         DOUBLE PRECISION NOT NULL,
    y         DOUBLE PRECISION NOT NULL,
    r         DOUBLE PRECISION NOT NULL,
    result    BOOLEAN          NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    owner_sub VARCHAR(255)
);

CREATE INDEX idx_coordinates_x ON coordinates (x);
CREATE INDEX idx_coordinates_y ON coordinates (y);
CREATE INDEX idx_coordinates_z ON coordinates (r);
CREATE INDEX idx_coordinates_owner_sub ON coordinates (owner_sub);