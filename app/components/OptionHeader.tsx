import { SignupOption } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";
import dayjs from "dayjs";

type Props = {
  option: SerializeFrom<SignupOption>
};

export default function OptionHeader({option}: Props) {
  const d = dayjs(option.date);

  const date = d.format("ddd MMM D, YYYY");
  const time = d.format("h:mm A");

  return (
    <>
      <h2 className="font-bold text-lg">{option.title}</h2>
      <p className="text-sm italic">{date}{option.hasTimeComponent ? ` • ${time}` : ''}</p>
    </>
  );
}
