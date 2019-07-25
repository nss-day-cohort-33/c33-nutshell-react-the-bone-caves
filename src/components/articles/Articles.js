import React, { Component } from 'react'
import './Articles.css'

export default class ArticleList extends Component {
    state = {
        saveDisabled: false
    }

    sortFriend = arr => {
      let id = +sessionStorage.getItem("userId");
      let friendArr = arr.filter(friend => friend.userId_1 === id || friend.userId_2 === id ? friend : '');
      let newArr = this.showFriends(friendArr)
      return newArr
    };

    showFriends = arr => {
        let id = +sessionStorage.getItem("userId")
        let friendArr = []
        arr.forEach( friend => {
          for (let foo of Object.entries(friend)) {
            let key = foo[0]
            let splitKey = key.split("_")
            if (splitKey[0] === "userId" && foo[1] !== id) {
              friendArr.push(foo[1])
            }
          }
        })
        friendArr.push(id)
        let stateArr = this.createArticles(friendArr)
        return stateArr
      }

    createArticles = arr => {
      let articleArr = []
      this.props.articles.forEach( article => {
        arr.forEach( user => {
          if (article.userId === user) {
            articleArr.push(article)
          }
        })
      })
      return articleArr
    }

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
                    this.sortFriend(this.props.friends).map(article =>
                        <div key ={article.id} className={article.userId === +sessionStorage.getItem("userId") ? "article-card user-article" : "article-card friend-article"}>
                            <div className="card-body">
                                <div className="card-title">
                                <h6>{article.title}</h6>
                                <p>{article.url}</p>
                                <p>{article.synopsis}</p>
                                <p>{article.date}</p>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => {
                                        this.props.history.push(`/articles/${article.id}/edit`);
                                    }}
                                    style={{display: article.userId === +sessionStorage.getItem("userId")  ? "" : "none"}}
                                    >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={
                                        () => {this.setState({ saveDisabled: true },
                                        () => this.props.deleteArticle(article.id),
                                        )
                                    }
                                }
                                style={{display: article.userId === +sessionStorage.getItem("userId")  ? "" : "none"}}
                                >Delete</button>
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