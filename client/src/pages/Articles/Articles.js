import React from "react";
import "./Articles.css";
import Card from "../../components/Card";
import { Col, Row } from "../../components/Grid";
import { FormBtn } from "../../components/Form";
import Modal from "../../components/Modal";

const Articles = ({ articles }) => (
  <div id="content">
    {articles.length ? 
    (
      <div>
        {articles.map(article => (
          <Card section="card border-primary mb-3" key={article._id}>
            <Card section="card-header">
              <h4>
                <Row>
                  <Col size="lg-9">
                    <a target="_blank" rel="noopener noreferrer" href={article.web_url}>
                      {article.headline}
                    </a>
                  </Col>
                  <Col size="lg-3">
                    {article.saveFunc?
                      (
                        <div>
                          {!article.saved?
                            (
                              <FormBtn onClick={() => article.saveFunc(article)}>
                                Save Article
                              </FormBtn>
                            ) : (
                              <FormBtn disabled>
                                Article Saved!
                              </FormBtn>
                            )
                          }
                        </div>
                      ) : (
                        <div>
                          <FormBtn onClick={article.delFunc}>
                            Delete Article
                          </FormBtn>
                          <FormBtn data-toggle="modal" data-target="#notes-modal" id="modal-open">
                            Comments
                          </FormBtn>
                        </div>
                      )
                    }
                  </Col>
                </Row>
              </h4>
            </Card>
            <Card section="card-body">
              {article.image?(
                  <img src={article.image} alt={article.news_desk} />
                ) : (
                  <div></div>
                )
              }
              <p className="summary">{article.snippet}</p>
            </Card>
          </Card>
        ))}
      </div>
    ) : (
      <h3>Use Controls to Search for New Articles or Display Saved Articles</h3>
    )}
    <Modal saveCommentFunc={articles.saveComment} />
  </div>
)

export default Articles;