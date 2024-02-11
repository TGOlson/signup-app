import { Title } from "@mantine/core";
import { SignupOption } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";
import dayjs from "dayjs";

type Props = {
  option: SerializeFrom<SignupOption>
  editable?: boolean
};

export default function OptionHeader({option, editable = false}: Props) {
  const d = dayjs(option.date);

  const date = d.format("ddd MMM D, YYYY");
  const time = d.format("h:mm A");

  return (
    <>
      {editable
        ? <input type="text" required defaultValue={option.title} className="input input-bordered input-md w-full font-bold text-lg" />
        : <Title order={4}>{option.title}</Title>
      }
      {/* <h2 className="font-bold text-lg">{option.title}</h2> */}
      {editable
        ? <div className="flex flex-col md:flex-row md:gap-2">
            <input type="date" required defaultValue={d.format('YYYY-MM-DD')} className="mt-2 input input-bordered input-sm max-w-[140px]" />
            <input type="time" defaultValue={option.hasTimeComponent ? d.format('HH:mm') : undefined} className="mt-2 input input-bordered input-sm max-w-[140px]" />
          </div>
        : <p className="text-sm italic">{date}{option.hasTimeComponent ? ` • ${time}` : ''}</p>
      }
    </>
  );
}
