import { Box } from "../Box";
import { Car } from "../Car";

const useGameElements = () => {
  const car = new Car({
    velocity: {
      x: 0,
      y: -0.01,
      z: 0,
    },
  });

  const ground = new Box({
    width: 10,
    height: 0.5,
    depth: 50,
    color: "#212121",
    position: {
      x: 0,
      y: -2,
      z: 0,
    },
  });
  ground.receiveShadow = true;

  const line = new Box({
    width: 0.15,
    height: 0.5,
    depth: 50,
    color: "yellow",
    position: {
      x: 0,
      y: -1.99,
      z: 0,
    },
  });
  line.receiveShadow = true;

  return {
    car,
    ground,
    line,
  };
};

export default useGameElements;
