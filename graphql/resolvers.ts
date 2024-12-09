import { Airport } from "../models/Airport";
import { Flight } from "../models/Flight";
import { Passenger } from "../models/Passenger";
import { ReservationService } from "../services/ReservationService";

const reservationService = new ReservationService("data/reservations.json");

export const resolvers = {
  Query: {
    reservations: () => reservationService.getAllReservations(),
    reservationById:(_: any, args:{id: number}) => 
      reservationService.getReservationById(args.id),
    reservationByPassengerId: (_: any, args: { id: number }) =>
      reservationService.getReservationByPassengerId(args.id),
    passengers: () => reservationService.getAllPassengers(),
    flights : () => reservationService.getAllFlights(),
    airports : () => reservationService.getAllAirports(),
  },
  Mutation: {
    createReservation: (_:any, args:{passenger: Passenger, flight: Flight, airport: Airport}) => 
      reservationService.createReservation(args),
    updateReservation: (_:any, args: {id: number, passenger: Passenger, flight: Flight, airport: Airport}) => 
      reservationService.updateReservation(args.id,args),
    deleteReservation: (_:any, args:{id: number}) => 
      reservationService.deleteReservation(args.id),
  }
};
