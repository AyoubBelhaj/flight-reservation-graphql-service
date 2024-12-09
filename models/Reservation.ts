import { Passenger } from "./Passenger";
import { Airport } from "./Airport";
import { Flight } from "./Flight";

export class Reservation {
  constructor(
    public id: number,
    public passenger: Passenger,
    public flight: Flight,
    public airport: Airport
  ) {}
}
