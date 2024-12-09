import { gql } from "apollo-server";

export const typeDefs = gql`
  type Passenger {
    id: Int
    firstName: String
    lastName: String
    gender: String
    age: Int
    nationality: String
  }

  type Airport {
    name: String
    countryCode: String
    countryName: String
    continent: String
    arrivalCode: String
  }

  type Flight {
    departureDate: String
    arrivalAirport: String
    pilotName: String
    status: String
  }

  type Reservation {
    id: Int
    passenger: Passenger
    flight: Flight
    airport: Airport
  }

  type Query {
    reservations: [Reservation]
    reservationById(id: Int!): Reservation
    reservationByPassengerId(id: Int!): Reservation
    passengers: [Passenger]
    airports: [Airport]
    flights: [Flight]
  }

  type Mutation {
    createReservation(
      passenger: PassengerInput!
      flight: FlightInput!
      airport: AirportInput!
    ) : Reservation
    updateReservation(
      id: Int!
      passenger: PassengerInput
      flight: FlightInput
      airport: AirportInput
    ): Reservation
    deleteReservation(
      id:Int!
    ): String
  }

  input PassengerInput {
    id: Int
    firstName: String
    lastName: String
    gender: String
    age: Int
    nationality: String
  }

  input FlightInput {
    departureDate: String
    arrivalAirport: String
    pilotName: String
    status: String
  }

  input AirportInput {
    name: String
    countryCode: String
    countryName: String
    continent: String
    arrivalCode: String
  }
`;
