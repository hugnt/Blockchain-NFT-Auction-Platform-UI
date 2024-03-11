import { ReactNode } from "react";
import { BiddingDetails, BiddingList, Home, MintingAsset, NotFound, Profile, VotingDetails } from "~/pages";
interface PublicRoute {
    name: string;
    path: string;
    component: React.ComponentType<any>;
  }
export const publicRoutes:PublicRoute[] = [
    {
        name:"Home",
        path:"/",
        component: Home
    },
    {
        name:"Home",
        path:"/Home",
        component: Home
    },
    {
        name:"Bidding",
        path:"/Bidding",
        component: BiddingList
    },
    {
        name:"BiddingDetails",
        path:"/Bidding/:id",
        component: BiddingDetails
    },
    {
        name:"Voting",
        path:"/Voting",
        component: VotingDetails
    },
    {
        name:"MintingAsset",
        path:"/MintingAsset",
        component: MintingAsset
    },
    {
        name:"Profile",
        path:"/Profile/:id",
        component: Profile
    },
    {
        name:"Assets",
        path:"/Assets",
        component: Profile
    },
    {
        name: "NotFound",
        path: '*',
        component: NotFound,
    }
];

