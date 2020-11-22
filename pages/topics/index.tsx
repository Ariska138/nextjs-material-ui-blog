import { GetStaticPropsResult } from 'next'
import { getSortedPostsData, getSortedTopics } from '../../src/lib/posts'

import React, { ReactElement } from 'react'
import TopicsDisplay from '../../src/components/TopicsDisplay'
import { Grid } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { PostData } from '../../src/types/posts'
import { Preview } from '../../src/components/Preview'
import { PageHeading } from '../../src/components/PageHeading'

const Topics = ({ topics, postsData }: { topics: string[]; postsData: PostData[] }): ReactElement => {
  return (
    <>
      <PageHeading title="The most popular tech topics" />
      <TopicsDisplay topics={topics} n={1000} />
      <Box pt={12}>
        <Box pt={4} pb={4}>
          <Grid item xs={12}>
            <Preview posts={postsData} />
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<{
    topics: string[]
    postsData: PostData[]
  }>
> => {
  const sortedTopics = getSortedTopics()
  const postsData = getSortedPostsData()

  return {
    props: {
      topics: sortedTopics,
      postsData: postsData.filter((pd) => pd.featured),
    },
  }
}

export default Topics
