package com.uni.vendas.controllers.docs;

import com.uni.vendas.data.dto.v1.UserDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface UserControllerDocs {

    @Operation(summary = "Find a User",
            description = "Find a User with user's Id",
            tags = {"Users"},
            responses = {
                @ApiResponse(description = "Sucess", responseCode = "200", content =
                    @Content(schema = @Schema(implementation = UserDTO.class))
                ),
                @ApiResponse(description = "No content", responseCode = "204", content = @Content),
                @ApiResponse(description = "Bad request", responseCode = "400", content = @Content),
                @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content)
            }
    )
    UserDTO findById(@PathVariable("Id") Long id);

    @Operation(summary = "Find all Users",
            description = "Find all Users ",
            tags = {"Users"},
            responses = {
                @ApiResponse(description = "Sucess", responseCode = "200", content = {
                    @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, array = @ArraySchema(schema = @Schema(implementation = UserDTO.class)))
                }),
                @ApiResponse(description = "No content", responseCode = "204", content = @Content),
                @ApiResponse(description = "Bad request", responseCode = "400", content = @Content),
                @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content)
            }
    )
    List<UserDTO> findAll();

    @Operation(summary = "Create a User",
            description = "Create a User with json, xml or yaml on body",
            tags = {"Users"},
            responses = {
                    @ApiResponse(description = "Sucess", responseCode = "200", content =
                    @Content(schema = @Schema(implementation = UserDTO.class))
                    ),
                    @ApiResponse(description = "No content", responseCode = "204", content = @Content),
                    @ApiResponse(description = "Bad request", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content)
            }
    )
    UserDTO createPerson(@RequestBody UserDTO personDTO);

    @Operation(summary = "Update a person",
            description = "Update a specific person by your ID",
            tags = {"Persons"},
            responses = {
                    @ApiResponse(description = "Sucess", responseCode = "200", content =
                    @Content(schema = @Schema(implementation = UserDTO.class))
                    ),
                    @ApiResponse(description = "No content", responseCode = "204", content = @Content),
                    @ApiResponse(description = "Bad request", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content)
            }
    )
    UserDTO updatePerson(@RequestBody UserDTO personDTO);

    @Operation(summary = "Find a person",
            description = "Find a specific person by your ID",
            tags = {"Persons"},
            responses = {
                    @ApiResponse(description = "Sucess", responseCode = "200", content = @Content),
                    @ApiResponse(description = "No content", responseCode = "204", content = @Content),
                    @ApiResponse(description = "Bad request", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content)
            }
    )
    ResponseEntity<?> deletePerson(@PathVariable("id") Long id);

}
