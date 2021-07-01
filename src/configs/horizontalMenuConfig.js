import React from "react"
import * as Icon from "react-feather"
import * as GI from "react-icons/gi";
import * as FC from "react-icons/fc";
import * as AI from "react-icons/ai";
const horizontalMenuConfig = [
  {
    id: "Dashboard ",
    title: "Dashboard ",
    type: "dropdown",
    icon: <Icon.Home size={16} />,
    children: [
      {
        id: "Revenue",
        title: "Revenue",
        icon: <Icon.Disc size={16} />,
        navLink: "/",
        type: "item",
        permissions: ["admin", "editor"]
      },
      {
        id: "Analytics ",
        title: "Analytics ",
        icon: <Icon.Disc size={16} />,
        navLink: "",
        type: "item",
        permissions: ["admin", "editor"]
      },
    ]
  },
  {
    id: "Players",
    title: "Players",
    type: "dropdown",
    icon: <Icon.PlayCircle size={16} />,
    children: [
      {
        id: "Playerslist",
        title: "Players",
        icon: <Icon.List size={16} />,
        navLink: "",
        type: "item",
        permissions: ["admin", "editor"]
      },
      {
        id: "KYC",
        title: "KYC",
        icon: <Icon.FileText size={16} />,
        type: "dropdown",
        children: [
          {
            id: "Pending KYC",
            title: "Pending KYC",
            icon: <Icon.Disc size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Approved KYC",
            title: "Approved KYC",
            icon: <Icon.Disc size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
        ]
      },
      {
        id: "Player Limits",
        title: "Players Limits",
        icon: <Icon.Maximize size={16} />,
        navLink: "",
        type: "item",
        permissions: ["admin", "editor"]
      },
      {
        id: "Deposit",
        title: "Deposit",
        icon: <Icon.PlusCircle size={16} />,
        navLink: "",
        type: "item",
        permissions: ["admin", "editor"]
      },
      {
        id: "Withdraw",
        title: "Withdraw",
        icon: <Icon.MinusCircle size={16} />,
        newTab: true,
        type: "item",
        navLink: "https://pixinvent.ticksy.com/",
        permissions: ["admin", "editor"]
      },
    ]
  },
  {
    id: "Users",
    title: "Users",
    icon: <Icon.Users size={20} />,
    type: "item",
    navLink: ""
  },
  {
    id: "Finance",
    title: "Finance",
    type: "dropdown",
    icon: <Icon.Edit3 size={20} />,
    children: [
      {
        id: "Deposits",
        title: "Deposits",
        type: "item",
        icon: <Icon.PlusSquare size={15} />,
        permissions: ["admin", "editor"],
        navLink: ""
      },
      {
        id: 'With-drawl Requests',
        title: "With-drawl Requests",
        type: "item",
        icon: <Icon.MinusSquare size={15} />,
        permissions: ["admin", "editor"],
        navLink: ""
      },
    ]
  },
  {
    id: "Games(Game providers)",
    title: "Games(Game providers)",
    type: "dropdown",
    icon: <Icon.Layers size={20} />,
    children: [
      {
        id: "Skill Games",
        title: "Skill Games",
        icon: <GI.GiOpenedFoodCan size={16} />,
        type: "dropdown",
        children: [
          {
            id: "Rummy",
            title: "Rummy",
            icon: <GI.GiDrum size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Poker",
            title: "Poker",
            icon: <GI.GiPokerHand size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Teenpatti",
            title: "Teenpatti",
            icon: <GI.GiSwordBrandish size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
        ]
      },
      {
        id: 'Sports Book',
        title: "Sports Book",
        type: "item",
        icon: <GI.GiSportMedal size={16} />,
        permissions: ["admin", "editor"],
        navLink: ""
      },
      {
        id: 'Casino',
        title: "Casino",
        type: "item",
        icon: <GI.GiCaldera size={16} />,
        permissions: ["admin", "editor"],
        navLink: ""
      },
      {
        id: 'Live Dealer',
        title: "Live Dealer",
        type: "item",
        icon: <GI.GiOlive size={16} />,
        permissions: ["admin", "editor"],
        navLink: ""
      },
      {
        id: 'Fantasy',
        title: "Fantasy",
        type: "item",
        icon: <GI.GiFangedSkull size={16} />,
        permissions: ["admin", "editor"],
        navLink: ""
      },
      {
        id: 'Betting Games',
        title: "Betting Games",
        type: "item",
        icon: <GI.GiBrainTentacle size={16} />,
        permissions: ["admin", "editor"],
        navLink: ""
      },
      {
        id: 'Slots',
        title: "Slots",
        type: "item",
        icon: <GI.GiSelfLove size={16} />,
        permissions: ["admin", "editor"],
        navLink: ""
      },
      {
        id: 'Virtual Games',
        title: "Virtual Games",
        type: "item",
        icon: <GI.GiVirtualMarker size={16} />,
        permissions: ["admin", "editor"],
        navLink: ""
      },     
    ]
  },
  {
    id: "Sportsbook",
    title: "Sportsbook",
    type: "dropdown",
    icon: <GI.GiBookshelf size={20} />,
    children: [
      {
        id: "Live / Prematch ",
        title: "Live / Prematch ",
        type: "item",
        icon: <GI.GiLiver size={16} />,
        permissions: ["admin", "editor"],
        navLink: "/sportsbook/live-prematch"
      },
      {
        id: 'Odds Feed (Dangerous Matches)',
        title: "Odds Feed (Dangerous Matches)",
        type: "item",
        icon: <GI.GiFemaleLegs size={16} />,
        permissions: ["admin", "editor"],
        navLink: "/xpggame/Balance"
      },
      {
        id: 'Super Bets',
        title: "Super Bets",
        type: "item",
        icon: <GI.GiSupersonicBullet size={16} />,
        permissions: ["admin", "editor"],
        navLink: "/xpggame/getLastWinners"
      },
      {
        id: "Event Management ",
        title: "Event Management ",
        icon: <GI.GiMagnetBlast size={16} />,
        type: "dropdown",
        children: [
          {
            id: "Live Booking List",
            title: "Live Booking List",
            icon: <GI.GiLightningShout size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Pre Match Admin",
            title: "Pre Match Admin",
            icon: <GI.GiMatchHead size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Live Admin",
            title: "Live Admin",
            icon: <GI.GiDiamondRing size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Market Type Groups",
            title: "Market Type Groups",
            icon: <GI.GiBookmarklet size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Market Type Booking",
            title: "Market Type Booking",
            icon: <GI.GiBookmark size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
        ]
      },
      {
        id: "Bet Limits",
        title: "Bet Limits",
        icon: <GI.GiEvilMinion size={16} />,
        type: "dropdown",
        children: [
          {
            id: "Global Limits",
            title: "Global Limits",
            icon: <GI.GiLobArrow size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Sports Limit",
            title: "Sports Limit",
            icon: <GI.GiSpottedBug size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
        ]
      },
      {
        id: "Betshops",
        title: "Betshops",
        icon: <GI.GiShoppingCart size={16} />,
        type: "dropdown",
        children: [
          {
            id: "Betshops1",
            title: "Betshops",
            icon: <GI.GiShop size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Cash Desks",
            title: "Cash Desks",
            icon: <GI.GiCash size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
        ]
      },
    ]
  },
  {
    id: "Tools",
    title: "Tools",
    type: "dropdown",
    icon: <GI.GiToolbox size={20} />,
    children: [
      {
        id: "Block Users",
        title: "Block Users",
        type: "item",
        icon: <Icon.UserX size={16} />,
        permissions: ["admin", "editor"],
        navLink: "/game/gamelist"
      },
      {
        id: "Geo IP Blocks",
        title: "Geo IP Blocks",
        icon: <Icon.UserMinus size={16} />,
        type: "dropdown",
        children: [
          {
            id: "Rummy",
            title: "Rummy",
            icon: <GI.GiOilDrum size={13} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Poker",
            title: "Poker",
            icon: <GI.GiPokerHand size={13} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "teenpatti",
            title: "teenpatti",
            icon: <GI.GiTearTracks size={13} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
        ]
      },
      {
        id: 'Clocker Settings',
        title: "Clocker Settings",
        type: "item",
        icon: <GI.GiClockwork size={15} />,
        permissions: ["admin", "editor"],
        navLink: ""
      },
    ]
  },
  {
    id: "Payment Gateway",
    title: "Payment Gateway",
    type: "dropdown",
    icon: <GI.GiPayMoney size={20} />,
    children: [
      {
        id: "Netcents (Bitcoin)",
        title: "Netcents (Bitcoin)",
        type: "item",
        icon: <GI.GiNetworkBars size={15} />,
        permissions: ["admin", "editor"],
        navLink: ""
      },
      {
        id: 'Skrill',
        title: "Skrill",
        type: "item",
        icon: <GI.GiSkirt size={15} />,
        permissions: ["admin", "editor"],
        navLink: ""
      },
      {
        id: 'Neteller',
        title: "Neteller",
        type: "item",
        icon: <GI.GiTeleport size={15} />,
        permissions: ["admin", "editor"],
        navLink: ""
      },
      {
        id: 'Jeton',
        title: "Jeton",
        type: "item",
        icon: <GI.GiJoystick size={15} />,
        permissions: ["admin", "editor"],
        navLink: ""
      },
    ]
  },
  {
    id: "Affiliates ",
    title: "Affiliates ",
    type: "dropdown",
    icon: <GI.GiAlienSkull size={20} />,
    children: [
      {
        id: "Network",
        title: "Network",
        icon: <GI.GiNestedEclipses size={16} />,
        type: "dropdown",
        children: [
          {
            id: "Users  ( with commissions)",
            title: "Users  ( with commissions)",
            icon: <GI.GiUluru size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Affiliate Groups",
            title: "Affiliate Groups",
            icon: <GI.GiRoundTable size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Deleted Users",
            title: "Deleted Users",
            icon: <GI.GiDefenseSatellite size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
      ]
    },
    {
      id: "Players12",
      title: "Players",
      icon: <GI.GiPlantsAndAnimals size={16} />,
      type: "dropdown",
      children: [
        {
          id: "Active Player",
          title: "Active Player",
          icon: <GI.GiBackwardTime size={18} />,
          type: "item",
          navlink: "",
          permissions: ["admin", "editor"]
        },
        {
          id: "Added Player",
          title: "Added Player",
          icon: <GI.GiSaddle size={18} />,
          type: "item",
          navlink: "",
          permissions: ["admin", "editor"]
        },
        {
          id: "Blocked Player",
          title: "Blocked Player",
          icon: <GI.GiStoneBlock size={18} />,
          type: "item",
          navlink: "",
          permissions: ["admin", "editor"]
        },
        {
          id: "Transfred Player ",
          title: "Transfred Player ",
          icon: <GI.GiTransportationRings size={18} />,
          type: "item",
          navlink: "",
          permissions: ["admin", "editor"]
        },
      ]
    },
    {
      id: "Tools ",
      title: "Tools ",
      icon: <GI.GiToolbox size={16} />,
      type: "dropdown",
      children: [
        {
          id: "Link Creator",
          title: "Link Creator",
          icon: <GI.GiLinkedRings size={18} />,
          type: "item",
          navlink: "",
          permissions: ["admin", "editor"]
        },
        {
          id: "Marketting Sources",
          title: "Marketting Sources",
          icon: <GI.GiBookmarklet size={18} />,
          type: "item",
          navlink: "",
          permissions: ["admin", "editor"]
        },
        {
          id: "Landing Pages",
          title: "Landing Pages",
          icon: <GI.GiPirateGrave size={18} />,
          type: "item",
          navlink: "",
          permissions: ["admin", "editor"]
        },
        {
          id: "Media Library",
          title: "Media Library",
          icon: <GI.GiMedallist size={18} />,
          type: "item",
          navlink: "",
          permissions: ["admin", "editor"]
        },
        {
          id: "Banner Creator",
          title: "Banner Creator",
          icon: <GI.GiBayonet size={18} />,
          type: "item",
          navlink: "",
          permissions: ["admin", "editor"]
        },
        {
          id: "Social Share",
          title: "Social Share",
          icon: <GI.GiSharpedTeethSkull size={18} />,
          type: "item",
          navlink: "",
          permissions: ["admin", "editor"]
        },
      ]
    }]
  },
  {
    id: "Promotions  ",
    title: "Promotions  ",
    type: "dropdown",
    icon: <GI.GiShieldBounces size={20} />,
    children: [
      {
        id: "VIP programs",
        title: "VIP programs",
        icon: <GI.GiVampireCape size={18} />,
        type: "item",
        navlink: "",
        permissions: ["admin", "editor"]
      },
      {
        id: "Bonus ",
        title: "Bonus ",
        icon: <GI.GiBoomerangSun size={18} />,
        type: "item",
        navlink: "",
        permissions: ["admin", "editor"]
      },
      {
        id: "Loyality Program",
        title: "Loyality Program",
        icon: <GI.GiVolleyballBall size={16} />,
        type: "dropdown",
        children: [
          {
            id: "Player Groups",
            title: "Player Groups",
            icon: <GI.Gi3DStairs size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Games Group",
            title: "Games Group",
            icon: <GI.GiGamepadCross size={18} />,
            type: "dropdown",
            children: [
              {
                id: "Table",
                title: "Table",
                icon: <GI.GiTabletopPlayers size={18} />,
                type: "item",
                navLink: "",
                permissions: ["admin", "editor"]
              },
              {
                id: "Settings ",
                title: "Settings ",
                icon: <GI.GiSettingsKnobs size={18} />,
                type: "item",
                navLink: "",
                permissions: ["admin", "editor"]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "Reports  ",
    title: "Reports  ",
    type: "dropdown",
    icon: <AI.AiFillStepBackward size={20} />,
    children: [
      {
        id: "Sportsbook1",
        title: "Sportsbook",
        icon: <AI.AiFillAppstore size={18} />,
        type: "dropdown",
        children: [
          {
            id: "bet Reports",
            title: "bet Reports",
            icon: <AI.AiOutlineBorderTop size={18} />,
            type: "item",
            navLink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Sports report",
            title: "Sports report",
            icon: <Icon.Circle size={18} />,
            type: "item",
            navLink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Competitions Report",
            title: "Competitions Report",
            icon: <Icon.Circle size={18} />,
            type: "item",
            navLink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Market Type Reports",
            title: "Market Type Reports",
            icon: <Icon.Circle size={18} />,
            type: "item",
            navLink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "New Market Reports",
            title: "New Market Reports",
            icon: <Icon.Circle size={18} />,
            type: "item",
            navLink: "",
            permissions: ["admin", "editor"]
          },
        ]
      },
      {
        id: "Casino",
        title: "Casino",
        icon: <Icon.Circle size={18} />,
        type: "dropdown",
        children: [
          {
            id: "Report By Game",
            title: "Report By Game",
            icon: <Icon.Circle size={18} />,
            type: "item",
            navLink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Report By Partner",
            title: "Report By Partner",
            icon: <Icon.Circle size={18} />,
            type: "item",
            navLink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Report By Player",
            title: "Report By Player",
            icon: <Icon.Circle size={18} />,
            type: "item",
            navLink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Partner Detail Report",
            title: "Partner Detail Report",
            icon: <Icon.Circle size={18} />,
            type: "item",
            navLink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Report By Player Game",
            title: "Report By Player Game",
            icon: <Icon.Circle size={18} />,
            type: "item",
            navLink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Report By Provider",
            title: "Report By Provider",
            icon: <Icon.Circle size={18} />,
            type: "item",
            navLink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Report By Bet",
            title: "Report By Bet",
            icon: <Icon.Circle size={18} />,
            type: "item",
            navLink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Report By Game Result",
            title: "Report By Game Result",
            icon: <Icon.Circle size={18} />,
            type: "item",
            navLink: "",
            permissions: ["admin", "editor"]
          },
        ]
      },
      {
        id: "Financial   ",
        title: "Financial   ",
        type: "dropdown",
        icon: <AI.AiFillMoneyCollect size={20} />,
        children: [
          {
            id: "Payments Report",
            title: "Payments Report",
            icon: <AI.AiOutlineMoneyCollect size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Payments Report by region",
            title: "Payments Report by region",
            icon: <AI.AiOutlineVerticalAlignMiddle size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Account Balance Report",
            title: "Account Balance Report",
            icon: <AI.AiFillUpSquare size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Sales Report",
            title: "Sales Report",
            icon: <AI.AiOutlineShop size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Daily Sales Report",
            title: "Daily Sales Report",
            icon: <AI.AiFillEdit size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Balance Report",
            title: "Balance Report",
            icon: <GI.GiBlackBelt size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
        ]
      },
      {
        id: "Betshops   ",
        title: "Betshops   ",
        type: "dropdown",
        icon: <GI.GiShoppingCart size={20} />,
        children: [
          {
            id: "Cash Desk Report",
            title: "Cash Desk Report",
            icon: <GI.GiDesk size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Terminal Report",
            title: "Terminal Report",
            icon: <Icon.Terminal size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Betshop Report",
            title: "Betshop Report",
            icon: <Icon.ShoppingBag size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
        ]
      },
      {
        id: "Fantasy Games   ",
        title: "Fantasy Games   ",
        type: "dropdown",
        icon: <GI.GiFangedSkull size={20} />,
        children: [
          {
            id: "Report By Game",
            title: "Report By Game",
            icon: <AI.AiOutlineVerticalAlignBottom size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
        ]
      },
      {
        id: "Skill Based Games  ",
        title: "Skill Based Games  ",
        type: "dropdown",
        icon: <GI.GiSkullInJar size={20} />,
        children: [
          {
            id: "Rummy Report",
            title: "Rummy Report",
            icon: <GI.GiAmmoBox size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
          {
            id: "Poker Report",
            title: "Poker Report",
            icon: <GI.GiPokerHand size={18} />,
            type: "item",
            navlink: "",
            permissions: ["admin", "editor"]
          },
        ]
      },
    ]
  },
  {
    id: "CMS   ",
    title: "CMS   ",
    type: "dropdown",
    icon: <FC.FcDisplay size={20} />,
    children: [
      {
        id: "Theme Builder",
        title: "Theme Builder",
        icon: <FC.FcSwitchCamera size={16} />,
        type: "item",
        navlink: "",
        permissions: ["admin", "editor"]
      },
      {
        id: " Games Configurator",
        title: " Games Configurator",
        icon: <FC.FcManager size={16} />,
        type: "item",
        navlink: "",
        permissions: ["admin", "editor"]
      },
      
    ]
  },
  {
    id: "Chat /Support Ticket management",
    title: "Chat /Support Ticket management",
    icon: <FC.FcSms size={20} />,
    type: "item",
    navLink: ""
  },

  {
    id: "Settings   ",
    title: "Settings   ",
    type: "dropdown",
    icon: <FC.FcSettings size={20} />,
    children: [
      {
        id: "Language",
        title: "Language",
        icon: <FC.FcNeutralTrading size={16} />,
        type: "item",
        navlink: "",
        permissions: ["admin", "editor"]
      },
      {
        id: " Currency",
        title: " Currency",
        icon: <FC.FcMoneyTransfer size={16} />,
        type: "item",
        navlink: "",
        permissions: ["admin", "editor"]
      },
      {
        id: " Domain configuration",
        title: " Domain configuration",
        icon: <FC.FcDoNotMix size={16} />,
        type: "item",
        navlink: "",
        permissions: ["admin", "editor"]
      },
      {
        id: "Bots",
        title: "Bots",
        icon: <FC.FcBusinessContact size={16} />,
        type: "item",
        navlink: "",
        permissions: ["admin", "editor"]
      },
    ]
  }

]

export default horizontalMenuConfig
