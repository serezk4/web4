package se.ifmo.gateway.controller.response;

import lombok.Value;

@Value
public class ServiceUnavailable {
    String serviceName;
    String status = "Service is currently unavailable.";
}
