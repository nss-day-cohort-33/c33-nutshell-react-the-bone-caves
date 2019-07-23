import React, { Component } from "react";

export default class ArticleForm extends Component {
    state={
        title:"",
        url:"",
        synopsis:""
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    constructNewArticle = evt => {
        evt.preventDefault();
          const article = {
            title: this.state.articleTitle,
            url: this.state.articleURL,
            synopsis: this.state.articleSynopsis,
            articleId: parseInt(this.state.articleId)
          };
          this.props.addArticle(article).then(() => this.props.history.push("/articles"))
        };

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
                    placeholder="Article Title"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="articleURL">Article URL</label>
                    <input
                    type="text"
                    required
                    className="form-control"
                    onChange={this.handleFieldChange}
                    id="articleURL"
                    placeholder="Article URL"
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
                    placeholder="Article Synopsis"
                    />
                </div>
                <button
                    type="submit"
                    onClick={this.constructNewArticle}
                    className="btn btn-primary"
                >
                    Submit
                </button>
                </form>
            </React.Fragment>
        )
    }
}