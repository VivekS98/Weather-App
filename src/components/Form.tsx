import { MapPosition, Position } from "@/utils/common.types";
import { Button, Input } from "@material-tailwind/react";
import { ChangeEvent, FC } from "react";

const Form: FC<MapPosition> = ({ position, setPosition }) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPosition((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="w-full lg:w-3/5 pb-10 pr-10 flex justify-center">
      <form className="w-full">
        <Input
          variant="standard"
          label="Latitude"
          name="lat"
          value={position.lat}
          onChange={onChangeHandler}
          placeholder="Latitude"
          crossOrigin={undefined}
        />
        <br />
        <Input
          variant="standard"
          label="Longiude"
          name="lng"
          value={position.lng}
          onChange={onChangeHandler}
          placeholder="Longiude"
          crossOrigin={undefined}
        />
        <br />
        <div className="flex justify-center">
          <Button
            className="px-10 py-4"
            variant="gradient"
            placeholder={undefined}
          >
            Get Weather
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
