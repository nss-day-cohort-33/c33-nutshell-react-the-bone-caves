import React, { Component } from 'react'

export default class ArticleList extends Component {
    render () {
        return (
        <React.Fragment>
            <div className="articleButton">
                <button type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push("/articles/new")}
                    }>
                Add Article
                </button>
            </div>
            <section className="articles">
                {
                    this.props.articles.map(article => 
                        <div key ={article.id} className="card">
                            <div className="card-body">
                                <div className="card-title">
                                <h6>{article.title}</h6>
                                <p>{article.url}</p>
                                <p>{article.synopsis}</p>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => {
                                        this.props.history.push(`/articles/${article.id}/edit`);
                                    }}
                                    >
                                    Edit
                                </button>
                                <button
                                    onClick={() => this.props.deleteArticle(article.id)}
                                    className="card-link">Delete</button>
                                </div>
                            </div>
                        </div>
                        )
                }
            </section>
        </React.Fragment>
        )
    }
}