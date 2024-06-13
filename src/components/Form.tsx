import { MapPosition, Position } from "@/utils/common.types";
import { Button, Input } from "@material-tailwind/react";
import { ChangeEvent, FC, FormEventHandler, useEffect, useState } from "react";

const Form: FC<MapPosition> = ({ position, setPosition }) => {
  const [pos, setPos] = useState<Position>({
    lat: position.lat || 51.505,
    lng: position.lng || -0.09,
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPos((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSumbitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setPosition(pos);
  };

  useEffect(() => {
    setPos(position);
  }, [position]);

  return (
    <div className="w-full lg:w-3/5 pb-10 pr-10 flex justify-center">
      <form className="w-full" onSubmit={onSumbitHandler}>
        <Input
          variant="standard"
          label="Latitude"
          name="lat"
          value={pos.lat}
          onChange={onChangeHandler}
          placeholder="Latitude"
          crossOrigin={undefined}
        />
        <br />
        <Input
          variant="standard"
          label="Longiude"
          name="lng"
          value={pos.lng}
          onChange={onChangeHandler}
          placeholder="Longiude"
          crossOrigin={undefined}
        />
        <br />
        <div className="flex justify-center">
          <Button
            className="px-10 py-4"
            variant="gradient"
            type="submit"
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
