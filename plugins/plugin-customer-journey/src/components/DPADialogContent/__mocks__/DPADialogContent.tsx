import React from "react";

interface MockProps {
  onDPAFailed: () => void;
  onDPAConfirm: () => void;
  onSetNewPin: (pin: string) => void;
}
const MockDPAContainer: React.FC<MockProps> = ({
  onDPAConfirm,
  onDPAFailed,
  onSetNewPin,
}) => {
  return (
    <div>
      <button type="button" className="button-failed" onClick={onDPAFailed}>
        Failed
      </button>
      <button type="button" className="button-confirm" onClick={onDPAConfirm}>
        Confirm
      </button>
      <button
        type="button"
        className="button-set-pin"
        onClick={() => onSetNewPin("1234")}
      >
        Set PIN
      </button>
    </div>
  );
};

export default MockDPAContainer;
