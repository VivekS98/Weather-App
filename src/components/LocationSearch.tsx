import { getCoordinatesByLocation } from "@/utils/api";
import { MapPosition } from "@/utils/common.types";
import { Card, Input, List, ListItem } from "@material-tailwind/react";
import { ChangeEvent, FC, useState } from "react";

interface Props {
  setPosition: MapPosition["setPosition"];
}

const LocationSearch: FC<Props> = ({ setPosition }) => {
  const [search, setSearch] = useState("");
  const [response, setResponse] = useState<any>([]);

  const getCoordinates = (place: string) => {
    getCoordinatesByLocation(place)
      .then((data) => setResponse(data))
      .catch((err) => console.error(err));
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    getCoordinates(e.target.value);
  };

  return (
    <div className="w-full relative mb-20">
      <Input
        variant="standard"
        label="Search Location"
        placeholder="Search Location"
        crossOrigin={undefined}
        value={search}
        onChange={onChangeHandler}
      />
      {response?.length && search?.length ? (
        <Card className="absolute top-12 w-full z-50">
          <List>
            {response.map((res: any, ind: number) => (
              <ListItem
                key={ind}
                onClick={() => {
                  setPosition({ lat: res?.lat, lng: res?.lon });
                  setResponse([]);
                }}
              >
                {res?.name}
                {res?.state ? `, ${res.state}` : ""}
                {res?.country ? `, ${res.country}` : ""}
              </ListItem>
            ))}
          </List>
        </Card>
      ) : null}
    </div>
  );
};

export default LocationSearch;
