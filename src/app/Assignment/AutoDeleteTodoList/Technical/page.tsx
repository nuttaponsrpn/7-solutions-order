"use client";

import GlassCard from "@/components/GlassCard";
import JumpingButton from "@/components/JumpingButton";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CategoryIcon from "@mui/icons-material/Category";
import DoNotTouchIcon from "@mui/icons-material/DoNotTouch";
import MoveDownIcon from "@mui/icons-material/MoveDown";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import SmartButtonIcon from "@mui/icons-material/SmartButton";
import { Button, CardActions, CardContent, CardMedia, styled, SvgIcon, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        setStep(i);
      }, i * 500);
    }
  }, []);

  const NextIcon = ({ display }: { display: boolean }) => {
    return (
      display && (
        <Button
          className="!ml-auto flex items-center gap-2 justify-center !text-white !border-white"
          size="small"
          variant="outlined"
          onClick={() => setStep((prev) => prev + 1)}
        >
          Next
          <span>
            <ArrowRightAltIcon />
          </span>
        </Button>
      )
    );
  };

  return (
    <PageContainer className="p-4 text-white rounded-md bg-gradient-to-br">
      <Typography color="white" variant="h3">
        Step by steps (4 steps)
      </Typography>
      <div className="flex flex-wrap items-center justify-center w-full gap-4 pt-4">
        <GlassCard className="flex flex-col max-w-md p-4 min-w-80" display={step >= 0}>
          <CardContent className="text-white">
            <Typography gutterBottom color="white" component="div" fontSize={24} fontWeight="bold" variant="h3">
              First (Loading data)
            </Typography>
            <CardMedia
              alt="json data"
              className="h-36 !object-contain mb-4"
              component="img"
              height="140px"
              image="/static/images/jsondata.png"
            />
            <Typography color="white" variant="body2">
              We got data from JSON list by using sideEffect and fetchAPI
              <br />
              <br />
              Then we keep the data into useState <Bold>autoDeleteData</Bold>
            </Typography>
          </CardContent>
          <CardActions className="mt-auto">
            <NextIcon display={step === 0} />
          </CardActions>
        </GlassCard>

        <GlassCard className="flex flex-col max-w-md p-4 min-w-80" display={step >= 1}>
          <CardContent>
            <Typography gutterBottom color="white" component="div" fontSize={24} fontWeight="bold" variant="h3">
              Second (Display data)
            </Typography>
            <div className="flex justify-around my-8">
              <div>
                <SvgIcon fontSize={"large"}>
                  <DoNotTouchIcon />
                </SvgIcon>
                No select data
              </div>

              <div>
                <SvgIcon fontSize={"large"}>
                  <CategoryIcon />
                </SvgIcon>
                Separate type
              </div>
            </div>

            <Typography color="white" variant="body2">
              We create 2 memo (notSelectedData and dataType)
              <br />- <Bold>notSelectedData</Bold> for keep the data that does not click by user
              <br />- <Bold>dataType</Bold> for keep type of input json
              <br />
              <br />
              <br />
              And use <Bold>useCallBack</Bold> to get data from each type <Bold>(getItemByType)</Bold>
              <br />- With these way it&apos;s will make program effective and not calling every render.
              <br />- Data will be keep updated once depDependencies change
              <br />
              <br />
              With these solutions if we have more type. We don&apos;t need to edit code
            </Typography>
          </CardContent>
          <CardActions className="mt-auto">
            <NextIcon display={step === 1} />
          </CardActions>
        </GlassCard>

        <GlassCard className="flex flex-col max-w-md p-4 min-w-80" display={step >= 2}>
          <CardContent>
            <Typography gutterBottom color="white" component="div" fontSize={24} fontWeight="bold" variant="h3">
              Third (Handle clicked)
            </Typography>
            <div className="flex justify-around my-8 bg-white rounded-md">
              <JumpingButton
                autoJump={false}
                delay={0}
                item={{ index: 0, name: "Click me please", type: "AnyType" }}
                onClick={() => {}}
                onJumping={() => {}}
              />
            </div>

            <Typography color="white" variant="body2">
              When user clicked on a button. The selected item will be keep in state <Bold>jumpingIndex</Bold>
              <br />
              <label className="flex justify-around my-8">
                <span>
                  <SvgIcon fontSize={"large"}>
                    <AdsClickIcon />
                  </SvgIcon>
                  Selected item
                </span>
                <span>
                  <SvgIcon fontSize={"large"}>
                    <OpenInBrowserIcon />
                  </SvgIcon>
                  Save to jumpingIndex
                </span>
              </label>
              <br />- Item that was keep in <Bold>jumpingIndex</Bold> state will not be displayed in the Not selected
              data state because it&apos;s get only item that does not exist in jumpingIndex state
            </Typography>
          </CardContent>
          <CardActions className="mt-auto">
            <NextIcon display={step === 2} />
          </CardActions>
        </GlassCard>

        <GlassCard className="flex flex-col max-w-md p-4 min-w-80" display={step >= 3}>
          <CardContent>
            <Typography gutterBottom color="white" component="div" fontSize={24} fontWeight="bold" variant="h3">
              Fourth (Button event)
            </Typography>

            <Typography color="white" variant="body2">
              Jumping button component will be handled itself (by assigning props) if autoJump is true
              <br />
              Button will be emited onJumping event when countdown delay is done.
              <br />
              <label className="flex justify-around my-8">
                <span>
                  <SvgIcon fontSize={"large"}>
                    <SmartButtonIcon />
                  </SvgIcon>
                  Jumping button
                </span>
                <span>
                  <SvgIcon fontSize={"large"}>
                    <MoveDownIcon />
                  </SvgIcon>
                  Jumping back
                </span>
              </label>
              <br />- Then we removed the item index from jumpingIndex state.
              <br />- And reorder of an autoDeleteData input.
              <br />- The button will be return automatically as useMemo detect jumpingIndex state changed.
              <br />- Display button components in each category type will be display correctly as we expected
            </Typography>
          </CardContent>
          <CardActions className="mt-auto">
            <Button
              disableElevation
              className="!ml-auto flex items-center gap-2 justify-center"
              color="success"
              size="small"
              variant="contained"
              onClick={() => router.push("/Assignment/AutoDeleteTodoList")}
            >
              Done
            </Button>
          </CardActions>
        </GlassCard>
      </div>
    </PageContainer>
  );
}

const Bold = styled("span")`
  font-weight: bold;
`;

const PageContainer = styled("div")`
  background-image: url("/static/images/sunset.jpg");
`;
