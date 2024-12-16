import { Reservation } from "../models/Reservation";
import { Passenger } from "../models/Passenger";
import { Airport } from "../models/Airport";
import { Flight } from "../models/Flight";
import * as fs from "fs";

export class ReservationService {
    reservations: Reservation[];
    filePath: string = "data/reservations.json";
    constructor(filePath: string) {
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        this.reservations = data.map((entry: any) => {
            const passenger = new Passenger(
                entry['passenger'].id,
                entry['passenger'].firstName,
                entry['passenger'].lastName,
                entry['passenger'].gender,
                entry['passenger'].age,
                entry['passenger'].nationality
            );

            const airport = new Airport(
                entry['airport'].name,
                entry['airport'].countryCode,
                entry['airport'].countryName,
                entry['airport'].continent,
                entry['airport'].airportCode
            );

            const flight = new Flight(
                entry['flight'].departureDate,
                entry['flight'].arrivalAirport,
                entry['flight'].pilotName,
                entry['flight'].status
            );

            return new Reservation(entry["id"], passenger, flight, airport);
        });
    }

    createReservation(data: any) {
        const newPassengerId = this.getAllPassengers().length + 1;
        const newPassenger = new Passenger(
            newPassengerId,
            data.passenger.firstName,
            data.passenger.lastName,
            data.passenger.gender,
            data.passenger.age,
            data.passenger.nationality
        );

        const newAirport = new Airport(
            data.airport.name,
            data.airport.countryCode,
            data.airport.countryName,
            data.airport.continent,
            data.airport.arrivalCode
        );

        const newFlight = new Flight(
            data.flight.departureDate,
            data.flight.arrivalAirport,
            data.flight.pilotName,
            data.flight.flightStatus
        );

        const newReservation = new Reservation(
            this.reservations.length + 1,
            newPassenger,
            newFlight,
            newAirport
        );

        this.reservations.push(newReservation);
        this._saveToFile();
        return newReservation;
    }

    updateReservation(id:any, data:any) {
        const reservationIndex = this.reservations.findIndex((r) => r.id === id);
        if (reservationIndex === -1) {
            throw new Error("Reservation not found");
        }
    
        // Deep merge nested objects
        const updatedReservation = {
            ...this.reservations[reservationIndex],
            passenger: {
                ...this.reservations[reservationIndex].passenger,
                ...data.passenger,
            },
            flight: {
                ...this.reservations[reservationIndex].flight,
                ...data.flight,
            },
            airport: {
                ...this.reservations[reservationIndex].airport,
                ...data.airport,
            },
        };
    
        this.reservations[reservationIndex] = updatedReservation;
        this._saveToFile();
        return updatedReservation;
    }

    deleteReservation(id: number) {
        console.log("Reservations before deletion:", this.reservations);
        const updatedReservations = this.reservations.filter((r) => r.id !== id);
        console.log("Reservations after deletion:", updatedReservations);
    
        if (updatedReservations.length === this.reservations.length) {
            console.error("No reservation found with ID:", id);
            throw new Error("Reservation not found");
        }
    
        this.reservations = updatedReservations;
        this._saveToFile();
        console.log("Reservations successfully updated in JSON file.");
        return "Reservation deleted successfully";
    }
    

    getAllReservations() {
        return this.reservations;
    }

    getReservationById(id: number) {
        return this.reservations.find((res) => res.id === id);
    }

    getReservationByPassengerId(id: number) {
        return this.reservations.find((res) => res.passenger.id === id);
    }

    getAllPassengers() {
        return this.reservations.map(res => res.passenger);
    }

    getAllFlights() {
        return this.reservations.map(res => res.flight);
    }

    getAllAirports() {
        return this.reservations.map(res => res.airport);
    }

    _saveToFile() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.reservations, null, 2));
    }
}
