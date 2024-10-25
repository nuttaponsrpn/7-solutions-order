"use client";

import JumpingButton from "@/components/JumpingButton";
import JumpingContainer from "@/components/JumpingContainer";
import { Card, CardContent, Typography } from "@mui/material";
import { useEffect, useRef } from "react";

export default function Page() {
  const countdownRef = useRef<HTMLElement>(null);
  const clickRef = useRef<HTMLInputElement>(null);
  const jumpingRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      countdownRef.current!.textContent = !!countdownRef.current?.textContent
        ? `${+countdownRef.current?.textContent - 1}`
        : "4";

      if (countdownRef?.current?.textContent === "0") clearInterval(countdownInterval);
    }, 1000);

    return function clearEffect() {
      clearInterval(countdownInterval);
    };
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 overflow-hidden lg:justify-start p-2">
      <title>Components - Auto Delete Todo List</title>
      <meta content="7Solutions - Documentation of Auto Delete Todo List" key="title" property="og:title" />

      <Card className="max-w-[460px] p-4">
        <JumpingContainer name="ABCD">
          {Array(3)
            .fill("")
            .map((i, index) => (
              <div key={index}>{index}</div>
            ))}
        </JumpingContainer>
        <CardContent>
          <Typography gutterBottom component="div" fontSize={24} fontWeight="bold" variant="h3">
            Jumping container
          </Typography>
          <Typography sx={{ color: "text.secondary" }} variant="body2">
            Jumping container is an styling container for display elemet in vertical alignment
            <br />
            It consists of 2 props.
            <br />
            (title: string, children: JSX.Element[])
            <br />
            <br />
            <label className="font-bold">Title is the header of container section</label>
            <br />
            <label className=""> - It&apos;s will be display if has value</label>
            <br />
            <br />
            <label className="font-bold">Children is the child element of container</label>
            <br />
            <label className=""> - It&apos;s will be display as flex column in container body</label>
          </Typography>
        </CardContent>
      </Card>

      <Card className="max-w-[460px] p-4">
        <JumpingButton
          autoJump={true}
          delay={5}
          item={{ index: 0, name: "Jumping button", type: "AnyType" }}
          onClick={() => {
            clickRef.current!.value = clickRef.current?.value ? `${+clickRef.current.value + 1}` : "1";
          }}
          onJumping={() => {
            jumpingRef.current!.value = "Jumping complete";
          }}
        />
        <CardContent>
          Jumping Countdown(5 seconds):
          <span className="font-bold" ref={countdownRef}>
            5{" "}
          </span>
          seconds...
          <br />
          <div className="flex">
            <div className="w-28">On Click:</div>
            <input disabled className="w-40 border-2 border-solid" ref={clickRef} type="text" />
          </div>
          <div className="flex">
            <div className="w-28">On Jumping:</div>
            <input disabled className="w-40 border-2 border-solid" ref={jumpingRef} type="text" />
          </div>
          <span className="text-nowrap">
            Item: {JSON.stringify({ index: 0, name: "Jumping button", type: "AnyType" })}
          </span>
          <br />
          <Typography gutterBottom component="div" fontSize={24} fontWeight="bold" variant="h3">
            Jumping Button
          </Typography>
          <Typography sx={{ color: "text.secondary" }} variant="body2">
            Jumping button is a button that will be emitted event onClick and onJumping
            <br />
            It consists of 5 props.
            <br />
            - item: AutoDelete
            <br />
            - delay: number (5)
            <br />
            - autoJump (true)
            <br />
            - onClick (in these sample, It increase number in an input box)
            <br />
            - onJumping (in these sample, it will display text in an input box)
            <br />
            <br />
            <br />
            <label className="font-bold">- Item for display an button name</label>
            <br />
            <label className="font-bold">- Delay is time to emit jump event</label>
            <br />
            <label className="font-bold">
              - AutoJump true for emit event after countdown delay is completed, false for not emit event
            </label>
            <br />
            <label className="font-bold">- OnClick emit onClick event</label>
            <br />
            <label className="font-bold">
              - OnJumping event that emit when autoJump is true and countdown delay is completed
            </label>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
