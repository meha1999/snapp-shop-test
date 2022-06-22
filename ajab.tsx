{/* {!loading ? (
              <ul className="grid">
                {data.map(
                  (item: any, key: Key | null | undefined, index: number) => (
                    <li
                      key={key}
                      className="card"
                      onDoubleClick={() => handleEditTask(key)}
                    >
                      <input
                        className="checkBox"
                        type="checkbox"
                        checked={item.done}
                        onChange={() => handleCheckTask(item)}
                      />
                      <span className="text">
                        {enableEdit === key ? (
                          <form
                            onSubmit={handleSubmit((data) =>
                              onEdit(data, item)
                            )}
                          >
                            <input
                              className="edit-input"
                              defaultValue={item.title}
                              autoFocus
                              {...register("editTask")}
                            />
                            <button className="edit-btn">
                              <i className="fa fa-pencil"></i>
                            </button>
                          </form>
                        ) : (
                          <div> {`${key}  ${item.title}`}</div>
                        )}
                      </span>

                      <i
                        onClick={() => handleDeleteTask(item.id)}
                        className="btn fa fa-close"
                      ></i>
                    </li>
                  )
                )}
              </ul>
            ) : (
              <div className="loader"></div>
            )} */}