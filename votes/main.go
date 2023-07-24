package main

import (
	"context"
	"math/rand"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
)

func main() {
	ctx := context.Background()
	addr := os.Getenv("REDIS_URL")
	if addr == "" {
		addr = "localhost:6379"
	}

	rdb := redis.NewClient(&redis.Options{
		Addr: addr,
		DB:   0,
	})

	cnt, err := rdb.HLen(ctx, "votes").Result()
	if cnt == 0 || err != nil {
		for b := 1; b <= 10; b++ {
			votes := rand.Intn(5)
			rdb.HSet(ctx, "votes", b, votes)
		}
	}

	router := gin.Default()
	router.Use(cors.Default())

	router.GET("/v1/books/:id/votes", func(c *gin.Context) {
		votes, err := rdb.HGet(ctx, "votes", c.Param("id")).Int64()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
		} else {
			c.JSON(http.StatusOK, gin.H{
				"votes": votes,
			})
		}
	})
	router.POST("/v1/books/:id/votes", func(c *gin.Context) {
		votes, err := rdb.HIncrBy(ctx, "votes", c.Param("id"), 1).Result()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
		} else {
			c.JSON(http.StatusOK, gin.H{
				"votes": votes,
			})
		}
	})
	router.DELETE("/v1/books/:id/votes", func(c *gin.Context) {
		votes, err := rdb.HIncrBy(ctx, "votes", c.Param("id"), -1).Result()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
		} else {
			c.JSON(http.StatusOK, gin.H{
				"votes": votes,
			})
		}
	})

	router.Run("0.0.0.0:8080")
}
