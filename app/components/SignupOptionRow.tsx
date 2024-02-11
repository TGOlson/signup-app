import { useRef, useState } from "react";
import type { Participant, SignupOption, User } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";
import { ChevronDownIcon, ChevronRightIcon, PlusIcon } from "@heroicons/react/24/solid";
import { CheckIcon } from "@heroicons/react/16/solid";
import { ActionIcon, Badge, Group, Stack, Table, Text, Title } from "@mantine/core";
import dayjs from "dayjs";

import SignupModal from "./SignupModal";

type Props = {
  option: SerializeFrom<SignupOption & {
    participants: Participant[];
  }>
  user: SerializeFrom<User> | null | undefined;
}

export default function SignupOptionRow({ option, user }: Props) {
  const [expanded, setExpanded] = useState(false);

  const day = dayjs(option.date);

  const date = day.format("ddd MMM D, YYYY");
  const time = day.format("h:mm A");

  const modalRef = useRef<HTMLDialogElement>(null);
  const availableSlots = option.quantity - option.participants.reduce((acc, participant) => acc + participant.quantity, 0);

  const participant = option.participants.find(participant => participant.userId === user?.id);
  const alreadySignedUp = !!participant;

  const openModal = () => modalRef.current?.showModal();

  return (
    <Table.Tr key={option.id}>
      <Table.Td width={35} className="vertical-align-top">
        <ActionIcon variant="transparent" size="xs">
          {expanded 
            ? <ChevronDownIcon onClick={() => setExpanded(!expanded)} className="h-6 w-6 "/>
            : <ChevronRightIcon onClick={() => setExpanded(!expanded)} className="h-6 w-6 "/>
          }
        </ActionIcon>
      </Table.Td>
      <Table.Td>
        <Stack gap={0}>
          <Title order={4}>{option.title}</Title>
          <Text fz='sm' className="italic">{date}{option.hasTimeComponent ? ` • ${time}` : ''}</Text>
          {expanded ? <Text fz='sm' mt={4}>{option.description}</Text> : null}
        </Stack>
      </Table.Td>
      <Table.Td align="center" w={{base: 70, xs: 130}}>
        <Group gap={4} justify="center">
          <Badge size="lg" circle>
            {availableSlots}
          </Badge>
          <Text size='sm' c='dimmed'>(of {option.quantity})</Text>
        </Group>
      </Table.Td>
      <Table.Td align="center" w={{base: 50, xs: 75}}>
        {alreadySignedUp 
          ? <Group gap={2} justify="center">
              <Text fz='xs'>Done</Text>
              <CheckIcon className="h-4 w-4 text-green-500" />
            </Group>
          : <ActionIcon onClick={openModal} variant="outline" radius="md"><PlusIcon className="w-2/3 h-2/3" /></ActionIcon>
        }
      </Table.Td>

      {user ? <SignupModal option={option} availableSlots={availableSlots} participant={participant} modalRef={modalRef} user={user} /> : null}    
    </Table.Tr>
  );  
}
