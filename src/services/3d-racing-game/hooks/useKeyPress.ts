import { useEffect } from "react";

const useKeyPress = ({ car, keys }: any) => {
  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyA":
          keys.a.pressed = true;
          break;
        case "KeyD":
          keys.d.pressed = true;
          break;
        case "KeyS":
          keys.s.pressed = true;
          break;
        case "KeyW":
          keys.w.pressed = true;
          break;
        case "Space":
          if (car.hitBox.bottom <= -1.745) {
            car.velocity.y = 0.08;
          }
          break;
      }
    };

    const keyUpHandler = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyA":
          keys.a.pressed = false;
          break;
        case "KeyD":
          keys.d.pressed = false;
          break;
        case "KeyS":
          keys.s.pressed = false;
          break;
        case "KeyW":
          keys.w.pressed = false;
          break;
      }
    };

    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
    };
  }, [car]);
};

export default useKeyPress;
