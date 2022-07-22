//import React from 'react' - обязательно импортируй, ВСЕГДА!!!

// Для включения поддержки TSX в проекте добавьте следующую строку в файл tsconfig.json:
// {
//    "compilerOptions": {
//    "jsx": "react"
//    }
// }
import React from "react";

type Props = {
  isDisabled?: boolean;
  size: "Big" | "Small";
  text: string;
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
};

export function FancyButton(props: Props) {
  const [toggled, setToggled] = React.useState(false);
  return (
    <button
      className={"Size-" + props.size}
      disabled={props.isDisabled || false}
      onClick={(event) => {
        setToggled(!toggled);
        props.onClick(event);
      }}
    >
      {props.text}
    </button>
  );
}

let button = (
  <FancyButton
    size="Big"
    text="Sign Up Now"
    onClick={() => console.log("Clicked!")}
  />
);

// FOR CLASS COMPONENT
import React from "react";
import { FancyButton } from "./FancyButton";
type Props = {
  firstName: string;
  userId: string;
};
type State = {
  isLoading: boolean;
};
class SignupForm extends React.Component<Props, State> {
  state = {
    isLoading: false
  };
  render() {
    return (
      <>
        <h2>
          Sign up for a 7-day supply of our tasty toothpaste now,{" "}
          {this.props.firstName}.
        </h2>
        <FancyButton
          isDisabled={this.state.isLoading}
          size="Big"
          text="Sign Up Now"
          onClick={this.signUp}
        />
      </>
    );
  }
  private signUp = async () => {
    this.setState({ isLoading: true });
    try {
      await fetch("/api/signup?userId=" + this.props.userId);
    } finally {
      this.setState({ isLoading: false });
    }
  };
}
let form = <SignupForm firstName="Albert" userId="13ab9g3" />;
