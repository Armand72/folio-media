import {
  GET_MEMBERS,
  GET_LIKE,
  GET_MEMBER,
  GET_FILTER,
  ADD_PAGE,
  SET_LOADING,
} from "../actions/types";
import { data } from "../../utils/data";

const initialState = {
  members: data,
  member: {},
  filterOption: "all",
  numberVisible: 2,
  numberPage: 1,
  visibles: [],
  hasMore: true,
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      const newLoading = !state.loading;

      return {
        ...state,
        loading: newLoading,
      };
    case ADD_PAGE:
      let newNumberPage = state.numberPage;
      let newNumberVisible = state.numberVisible;
      let newHasMore = state.hasMore;

      if (newHasMore) {
        newNumberPage = state.numberPage + 1;
        newNumberVisible = newNumberPage * state.numberVisible;
        console.log(newNumberVisible, newNumberPage);
        if (newNumberVisible > state.members.length) {
          newNumberVisible = state.members.length;
          newHasMore = false;
        } else if (newNumberVisible === state.members.length) {
          newHasMore = false;
        }
      }

      return {
        ...state,
        numberVisible: newNumberVisible,
        numberPage: newNumberPage,
        hasMore: newHasMore,
      };
    case GET_MEMBERS:
      let visibles;

      if (state.filterOption === "all") {
        visibles = state.members.slice(0, state.numberVisible);
      } else if (state.filterOption === "liked") {
        visibles = state.visibles.filter((props) => props.likeBool === true);
      } else {
        visibles = state.members.filter(
          (props) => props.category === state.filterOption
        );
      }
      console.log(state.filterOption);
      return {
        ...state,
        visibles: [...state.visibles],
        visibles,
        loading: false,
      };
    case GET_LIKE:
      const id = payload;

      //  trouve le membre à modifier
      const index = state.visibles.findIndex((p) => p.id === id);
      return {
        ...state,
        visibles: [
          ...state.visibles.slice(0, index),
          {
            ...state.visibles[index],
            likeBool: !state.visibles[index].likeBool,
            likes:
              state.visibles[index].likeBool === true
                ? state.visibles[index].likes - 1
                : state.visibles[index].likes + 1,
          },
          ...state.visibles.slice(index + 1),
        ],
      };
    case GET_MEMBER:
      const idMember = payload;
      const memberData = state.members.find((p) => p.id === idMember);

      return {
        ...state,
        member: {
          ...state.member,
          memberData,
        },
      };
    case GET_FILTER:
      const filter = payload;

      return {
        ...state,
        filterOption: filter,
      };

    default:
      return state;
  }
}

//       const member = state.members.find((p) => p.id === id);
// {
//   ...state,
//   members: [
//     ...state.members.filter((p) => p !== member),
//     {
//       ...member,
//       likeBool: !member.likeBool,
//       likes:
//         member.likeBool === true ? member.likes - 1 : member.likes + 1,
//     },
//   ],
// };
