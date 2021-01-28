import React from "react";
import { Container, Step } from "semantic-ui-react";

function CallProgress() {
  return (
    <Container>
      <Step.Group fluid>
        <Step
          icon="phone"
          title="Ringing"
          description="+1 555-5555"
          completed
        />
        <Step
          icon="cogs"
          title="In queue"
          description="User waiting in queue"
          active
        />
        <Step
          icon="headphones"
          title="Answered"
          description="Answer by John"
          disabled
        />
        <Step
          icon="times"
          title="Hang up"
          description="Missed call"
          active
        />
      </Step.Group>
    </Container>
  );
}

export default CallProgress;
