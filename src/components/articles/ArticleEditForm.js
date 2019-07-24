import React, { Component } from "react"
import ArticleHandler from "../apiManager/ArticleHandler"


export default class ArticleEditForm extends Component {
    state = {
        articleTitle: "",
        articleURL: "",
        articleSynopsis:"",
        articleDate:""
      };

      handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    };

    updateExistingArticle = evt => {
        evt.preventDefault()

          const editedArticle = {
            userId: +sessionStorage.getItem("userId"),
            id: this.props.match.params.articlesId,
            title: this.state.articleTitle,
            url: this.state.articleURL,
            synopsis: this.state.articleSynopsis,
            timestamp: Date.now(),
            date: this.state.articleDate
          }

      this.props.updateArticle(editedArticle)
      .then(() => this.props.history.goBack())
    }
    componentDidMount() {
        ArticleHandler.get(this.props.match.params.articlesId)
        .then(article => {
          this.setState({
            articleTitle: article.title,
            articleURL: article.url,
            articleSynopsis: article.synopsis,
            articleDate: article.date
          });
        });
      }

      render() {
        return (
          <React.Fragment>
            <form className="articleForm">
              <div className="form-group">
                <label htmlFor="articleTitle">Article Title</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="articleTitle"
                  value = {this.state.articleTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="articleURL">URL</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="articleURL"
                  value = {this.state.articleURL}
                />
              </div>
              <div className="form-group">
                <label htmlFor="articleSynopsis">Article Synopsis</label>
                    <input
                    type="text"
                    required
                    className="form-control"
                    onChange={this.handleFieldChange}
                    id="articleSynopsis"
                    value = {this.state.articleSynopsis}
                    />
              </div>
              <button
                type="submit"
                onClick={this.updateExistingArticle}
                className="btn btn-primary"
              >
                Submit
              </button>
            </form>
          </React.Fragment>
        );
      }
}