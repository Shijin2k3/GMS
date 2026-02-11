import {
  faChromecast,
  faFacebook,
  faGoogle,
  faGooglePlus,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
  faAddressCard,
  faAnglesLeft,
  faAnglesRight,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowRightFromBracket,
  faArrowUp,
  faArrowUpRightDots,
  faBars,
  faBed,
  faBell,
  faBookOpen,
  faBriefcase,
  faBuildingColumns,
  faBullhorn,
  faCalendarDay,
  faCamera,
  faCaretDown,
  faCaretRight,
  faCheck,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faCircle,
  faCircleArrowUp,
  faCircleCheck,
  faCirclePlus,
  faCircleQuestion,
  faCircleXmark,
  faCloudArrowDown,
  faCloudArrowUp,
  faCog,
  faComment,
  faComments,
  faDesktop,
  faDownload,
  faDownLong,
  faEllipsis,
  faEllipsisVertical,
  faEnvelope,
  faExpand,
  faEye,
  faEyeSlash,
  faFile,
  faFileImage,
  faFileVideo,
  faFileWord,
  faGears,
  faGraduationCap,
  faHeart,
  faHome,
  faHouse,
  faHouseLaptop,
  faHouseMedical,
  faKey,
  faLanguage,
  faListCheck,
  faLocationDot,
  faMagnifyingGlass,
  faMapPin,
  faMicrophone,
  faMicrophoneSlash,
  faMinimize,
  faMoneyBillWave,
  faPaperclip,
  faPaperPlane,
  faPencil,
  faPenToSquare,
  faPeopleLine,
  faPhone,
  faPhoneFlip,
  faPhoneSlash,
  faPlus,
  faRepeat,
  faRotateRight,
  faShare,
  faShareFromSquare,
  faShareNodes,
  faSignOut,
  faSort,
  faSortDown,
  faSpinner,
  faSquareCheck,
  faStethoscope,
  faSyncAlt,
  faTrashCan,
  faTriangleExclamation,
  faUser,
  faUserAltSlash,
  faUserCheck,
  faUserClock,
  faUserDoctor,
  faUserGroup,
  faUserLock,
  faUserPlus,
  faUsers,
  faUserSecret,
  faUsersLine,
  faUserXmark,
  faVideo,
  faVideoSlash,
  faWallet,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import {
  faCalendarDays,
  faClipboard,
  faClock,
  faCommentDots,
  faEdit,
  faFaceSmile,
  faFileLines,
  faFilePdf,
  faImage,
  faHeart as RegularHeart,
} from '@fortawesome/free-regular-svg-icons';

export type IconNames = keyof typeof IconTypeMap;

export const IconTypeMap = {
  userLock: {
    default: faUserLock,
  },
  eye: {
    default: faEye,
  },
  eyeClosed: {
    default: faEyeSlash,
  },
  mic: {
    default: faMicrophone,
  },
  blockUser: {
    default: faUserAltSlash,
  },
  unblockUser: {
    default: faUserCheck,
  },
  bell: {
    default: faBell,
  },
  peopleLine: {
    default: faPeopleLine,
  },
  micOff: {
    default: faMicrophoneSlash,
  },
  phoneOff: {
    default: faPhoneSlash,
  },
  cast: {
    default: faChromecast,
  },
  squareShare: {
    default: faShareFromSquare,
  },
  xMark: {
    default: faXmark,
  },
  secretUser: {
    default: faUserSecret,
  },
  paperPlane: {
    default: faPaperPlane,
  },
  userGroup: {
    default: faUserGroup,
  },
  loading: {
    default: faRotateRight,
  },
  bookOpen: {
    default: faBookOpen,
  },
  attach: {
    default: faPaperclip,
  },
  clipboard: {
    default: faClipboard,
  },
  bed: {
    default: faBed,
  },
  clock: {
    default: faClock,
  },
  comment: {
    default: faComment,
  },
  search: {
    default: faMagnifyingGlass,
  },
  envelope: {
    default: faEnvelope,
  },
  plus: {
    default: faPlus,
  },
  task: {
    default: faListCheck,
  },
  key: {
    default: faKey,
  },
  download: {
    default: faDownload,
  },
  trash: {
    default: faTrashCan,
  },
  check: {
    default: faCheck,
  },
  language: {
    default: faLanguage,
  },
  address: {
    default: faAddressCard,
  },
  phoneFlip: {
    default: faPhoneFlip,
  },
  phone: {
    default: faPhone,
  },
  mapPin: {
    default: faMapPin,
  },
  money: {
    default: faMoneyBillWave,
  },
  camera: {
    default: faCamera,
  },
  video: {
    default: faVideo,
  },
  bank: {
    default: faBuildingColumns,
  },
  videoOff: {
    default: faVideoSlash,
  },
  file: {
    default: faFile,
  },
  filePdf: {
    default: faFilePdf,
  },
  user: {
    default: faUser,
  },
  users: {
    default: faUsers,
  },
  userPlus: {
    default: faUserPlus,
  },
  userCheck: {
    default: faUserCheck,
  },
  userXMark: {
    default: faUserXmark,
  },
  edit: {
    default: faPenToSquare,
  },
  triangleExclamation: {
    default: faTriangleExclamation,
  },
  comments: {
    default: faComments,
  },
  fileWord: {
    default: faFileWord,
  },
  fileVideo: {
    default: faFileVideo,
  },
  fileImage: {
    default: faFileImage,
  },
  share: {
    default: faShare,
  },
  userclock: {
    default: faUserClock,
  },
  squareCheck: {
    default: faSquareCheck,
  },
  spinner: {
    default: faSpinner,
  },
  chevronDown: {
    default: faChevronDown,
  },
  googlePlus: {
    default: faGooglePlus,
  },
  facebook: {
    default: faFacebook,
  },
  twitter: {
    default: faXTwitter,
  },
  google: {
    default: faGoogle,
  },
  pencil: {
    default: faPencil,
  },
  graduationCap: {
    default: faGraduationCap,
  },
  repeat: {
    default: faRepeat,
  },
  calendarDays: {
    default: faCalendarDays,
  },
  building: {
    default: faBuildingColumns,
  },
  briefCase: {
    default: faBriefcase,
  },
  circleQuestion: {
    default: faCircleQuestion,
  },
  houseLapTop: {
    default: faHouseLaptop,
  },
  houseMedical: {
    default: faHouseMedical,
  },
  image: {
    default: faImage,
  },
  videoCam: {
    default: faVideo,
  },
  fileLines: {
    default: faFileLines,
  },
  faceSmile: {
    default: faFaceSmile,
  },
  faVerticalEllipsis: {
    default: faEllipsisVertical,
  },
  regularEdit: {
    default: faEdit,
  },
  regularClock: {
    default: faClock,
  },
  regularHeart: {
    default: RegularHeart,
  },
  heart: {
    default: faHeart,
  },
  dottedComment: {
    default: faCommentDots,
  },
  downCaret: {
    default: faCaretDown,
  },
  rightCaret: {
    default: faCaretRight,
  },
  chevronLeft: {
    default: faChevronLeft,
  },
  chevronRight: {
    default: faChevronRight,
  },
  chevronUp: {
    default: faChevronUp,
  },

  arrowUp: {
    default: faArrowUp,
  },
  arrowDown: {
    default: faArrowDown,
  },
  arrowLeft: {
    default: faArrowLeft,
  },
  arrowRight: {
    default: faArrowRight,
  },
  locationDot: {
    default: faLocationDot,
  },
  cloudArrowUp: {
    default: faCloudArrowUp,
  },
  calenderDay: {
    default: faCalendarDay,
  },
  shareNodes: {
    default: faShareNodes,
  },
  signOut: {
    default: faSignOut,
  },
  arrowRightFromBracket: {
    default: faArrowRightFromBracket,
  },
  desktop: {
    default: faDesktop,
  },
  arrowUpRightDots: {
    default: faArrowUpRightDots,
  },
  house: {
    default: faHouse,
  },
  usersLine: {
    default: faUsersLine,
  },
  bars: {
    default: faBars,
  },
  bullHorn: {
    default: faBullhorn,
  },
  downLong: {
    default: faDownLong,
  },
  anglesRight: {
    default: faAnglesRight,
  },
  anglesLeft: {
    default: faAnglesLeft,
  },
  stethoScope: {
    default: faStethoscope,
  },
  sort: {
    default: faSort,
  },
  sortDown: {
    default: faSortDown,
  },
  circle: {
    default: faCircle,
  },
  ellipsis: {
    default: faEllipsis,
  },
  minimize: {
    default: faMinimize,
  },
  expand: {
    default: faExpand,
  },
  syncAlt: {
    default: faSyncAlt,
  },
  wallet: {
    default: faWallet,
  },
  circleArrowUp: {
    default: faCircleArrowUp,
  },
  userDoctor: {
    default: faUserDoctor,
  },
  circleCheck: {
    default: faCircleCheck,
  },
  circleXMark: {
    default: faCircleXmark,
  },
  home: {
    default: faHome,
  },
  setting: {
    default: faCog,
  },
  gearSetting: {
    default: faGears,
  },
  circlePlus: {
    default: faCirclePlus,
  },
  cloudArrowDown: {
    default: faCloudArrowDown,
  },
};

