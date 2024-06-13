import { Dispatch, SetStateAction } from "react";

export interface Position {
  lat: number;
  lng: number;
}

export interface MapPosition {
  position: Position;
  setPosition: Dispatch<SetStateAction<Position>>;
}
