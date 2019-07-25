import React, { Component } from "react";
import './Articles.css'

export default class ArticleDash extends Component {
    state = {
        saveDisabled: false
    }

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
            <h4>Articles:</h4>
            <section className="articles">
                {
                    this.showFriends(this.props.friends).map(article => 
                        <div key ={article.id} className={article.userId === +sessionStorage.getItem("userId") ? "article-card user-article" : "article-card friend-article"}>
                            <div className="card-body">
                                <div className="card-title">
                                <h6>{article.title}</h6>
                                <p>{article.url}</p>
                                <p>{article.synopsis}</p>
                                <p>{article.date}</p>
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