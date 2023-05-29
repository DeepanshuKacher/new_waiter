import { constants } from "../constants";
import { updateTableStatus } from "./functions";

interface Props {
  code: string;
  message: any;
}
export const mqttFunction = (props: Props) => {
  const { code, message } = props;
  switch (code) {
    case "tableStatus":
      updateTableStatus(message);
      break;
    default:
      if (constants.IS_DEVELOPMENT) console.log(props);
      break;
  }
};
