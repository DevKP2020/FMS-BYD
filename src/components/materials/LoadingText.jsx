import React from 'react'
import TypeIt from "typeit-react"

const LoadingText = () => {
  return (
    <TypeIt
        getBeforeInit={(instance) => {
        instance.type("Loading...")
                .pause(750)
                .delete(10)
                .type("Loading...")
                .pause(750)
                .delete(10)
                .type("Loading...")
                .pause(750)
                .delete(10)
                .type("Loading...")
                .pause(750)
                .delete(10)
                .type("Loading...")
                .pause(750)
                .delete(10)
                .type("Loading...")
                .pause(750)
                .delete(10)
                .type("Loading...")
                .pause(750)
                .delete(10)
                .type("Stuck?")
                .pause(1000)
                .type(" Please check the server");

            return instance;
        }}
    />
  )
}

export default LoadingText