"use client";

import GlassCard from "@/components/GlassCard";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import { Button, CardActions, CardContent, CardMedia, styled, SvgIcon, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { useRouter } from "next/navigation";

export default function Page() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    for (let i = 0; i < 3; i++) {
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
        Step by steps (3 steps)
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
              Then we keep the data into useState <Bold>baseData</Bold>
            </Typography>
          </CardContent>
          <CardActions className="mt-auto">
            <NextIcon display={step === 0} />
          </CardActions>
        </GlassCard>

        <GlassCard className="flex flex-col max-w-md p-4 min-w-80" display={step >= 1}>
          <CardContent>
            <Typography gutterBottom color="white" component="div" fontSize={24} fontWeight="bold" variant="h3">
              Second (Format data)
            </Typography>
            <div className="flex justify-around my-8">
              <div>
                <SvgIcon fontSize={"large"}>
                  <FlipCameraAndroidIcon />
                </SvgIcon>
                Format data
              </div>
            </div>

            <Typography color="white" variant="body2">
              We create function <Bold>groupUsersByDepartment</Bold>
              <br />
              <br />- <Bold>What The function does??</Bold>
              <br />
              <br />- First create a department from Object.keys and avoid duplicate department
              <br />- Secound count simple object like male, female
              <br />- Create hair object by using key of Hair type, and Address object by concatenate firstname and
              <br />- Finally find min and max age by comparing user age in group
              <br />
            </Typography>
          </CardContent>
          <CardActions className="mt-auto">
            <NextIcon display={step === 1} />
          </CardActions>
        </GlassCard>

        <GlassCard className="flex flex-col max-w-md p-4 min-w-80" display={step >= 2}>
          <CardContent>
            <Typography gutterBottom color="white" component="div" fontSize={24} fontWeight="bold" variant="h3">
              Third (Bonus feature)
            </Typography>
            <div className="flex flex-col items-center justify-center my-8">
              <div>
                <SvgIcon fontSize={"large"}>
                  <StarHalfIcon />
                </SvgIcon>
              </div>
              Special Bonus
            </div>

            <Typography color="white" variant="body2">
              Create custom feature for fun
              <br />
              <br />- User can see all users
              <br />- User can see user info by clicking on left panel name
              <br />- User can search name to filter both user list and department list
            </Typography>
          </CardContent>

          <CardActions className="mt-auto">
            <Button
              disableElevation
              className="!ml-auto flex items-center gap-2 justify-center"
              color="success"
              size="small"
              variant="contained"
              onClick={() => router.push("/Assignment/ConvertData")}
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
