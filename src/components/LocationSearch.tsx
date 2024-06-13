import { getCoordinatesByLocation } from "@/utils/api";
import { MapPosition } from "@/utils/common.types";
import useSearchHistory from "@/utils/hooks/useSearchHistory";
import { Card, Input, List, ListItem } from "@material-tailwind/react";
import { ChangeEvent, FC, useState } from "react";

interface Props {
  setPosition: MapPosition["setPosition"];
}

const LocationSearch: FC<Props> = ({ setPosition }) => {
  const [search, setSearch] = useState("");
  const [response, setResponse] = useState<any>([]);
  const [isInputOnFocus, setIsInputOnFocus] = useState(false);

  const { history, addLocation } = useSearchHistory();

  const getCoordinates = (place: string) => {
    getCoordinatesByLocation(place)
      .then((data) => setResponse(data))
      .catch((err) => console.error(err));
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    getCoordinates(e.target.value);
  };

  const onClickLocation = (res: any) => {
    setPosition({ lat: res?.lat, lng: res?.lon });
    addLocation(res);
    setSearch("");
    setResponse([]);
  };

  return (
    <div
      className="w-full relative mb-20"
      onFocus={() => setIsInputOnFocus(true)}
      onBlur={() => setTimeout(() => setIsInputOnFocus(false), 500)}
    >
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
              <ListItem key={ind} onClick={() => onClickLocation(res)}>
                {res?.name}
                {res?.state ? `, ${res.state}` : ""}
                {res?.country ? `, ${res.country}` : ""}
              </ListItem>
            ))}
          </List>
        </Card>
      ) : isInputOnFocus && history?.length ? (
        <Card className="absolute top-12 w-full z-50">
          <span className="ml-5 mt-2 w-full font-bold">Recent Searches</span>
          <List>
            {history.map((res: any, ind: number) => (
              <ListItem key={ind} onClick={() => onClickLocation(res)}>
                {res?.name}
              </ListItem>
            ))}
          </List>
        </Card>
      ) : null}
    </div>
  );
};

export default LocationSearch;
