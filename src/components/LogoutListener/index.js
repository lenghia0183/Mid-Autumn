import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { eventEmitter } from "../../utils";
import { useUser } from "../../context";
import { EVENT_EMITTER } from "../../constants";

const LogoutListener = () => {
  const { logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    eventEmitter.once(EVENT_EMITTER.LOGOUT, () => {
      logout(navigate);
    });

    return () => {
      eventEmitter.removeAllListeners(EVENT_EMITTER.LOGOUT);
    };
  }, [logout, navigate]);

  return <></>;
};

export default LogoutListener;
