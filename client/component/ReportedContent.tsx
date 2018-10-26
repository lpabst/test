import * as React from "React";
import gql from "graphql-tag";
import { fetch, mutate } from "../network/graphql";
import "../styles/App.css";
import ContentModal from "./ContentModal";
import { USER_ID } from "../session";

// const initialState = {
//   reportedContent: [],
//   showContentModal: false,
//   selectedContent: null,
// };

const userId = sessionStorage.getItem(USER_ID);

const initialState = {
  contents: [],
  author: [],
  authorContent: [],
  selectedContent: "",
  showContentModal: false,
  publisehdAt: "",
  isFlagged: false,
};

type State = Readonly<typeof initialState>;

export default class ReportedContent extends React.Component<object, State> {
  readonly state: State = initialState;

  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.closeContentModal = this.closeContentModal.bind(this);
    this.updateContentInfo = this.updateContentInfo.bind(this);
  }

  componentDidMount() {
    this.fetchReportedContent();
  }

  update(e) {
    let state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  fetchReportedContent() {
    const query = gql`
      query {
        allVideos {
          videos {
            id
            publishedAt
            author {
              id
              firstName
              lastName
            }
          }
        }
      }
    `;
    fetch(query, { variables: { id: userId } }).then(({ allVideos }) =>
      this.setState({
        contents: allVideos.videos || [],
        author: allVideos.videos.author || [],
      })
    );
  }

  viewContent(index) {
    this.setState({
      showContentModal: true,
      selectedContent: index,
    });
  }

  closeContentModal() {
    this.setState({
      showContentModal: false,
      selectedContent: null,
    });
  }

  updateContentInfo(content) {}

  archiveContent() {}

  render() {
    let { contents, selectedContent } = this.state;
    let modalContent = contents[selectedContent];
    return (
      <div className="container">
        <h3>Reported Content</h3>
        <div>
          <ul className="demo-list-icon mdl-list">
            {this.state.contents.map((content, i) => (
              <li
                className="mdl-list__item"
                key={i}
                onClick={() => this.viewContent(i)}
              >
                <i className="material-icons mdl-list__item-icon" />
                <p>
                  Reported Content: {content.publishedAt} {content.id}
                </p>
              </li>
            ))}
          </ul>
          {/* <li className="mdl-list__item" onClick={() => this.viewContent()}>
            <i className="material-icons mdl-list__item-icon" />
            <p>Reported Content: none yet yay!</p>
          </li> */}
        </div>

        {this.state.showContentModal && (
          <ContentModal
            modalContent={modalContent}
            closeContentModal={this.closeContentModal}
            archiveContent={this.archiveContent}
            updateContentInfo={this.updateContentInfo}
            updateParentState={this.update}
          />
        )}
      </div>
    );
  }
}
