CREATE TABLE item_images (
    item_id UUID NOT NULL REFERENCES item(id) ON DELETE CASCADE,
    image_url VARCHAR(255) NOT NULL
);