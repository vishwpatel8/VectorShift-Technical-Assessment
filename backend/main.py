from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class PipelinePayload(BaseModel):
    nodes: list[dict[str, Any]] = []
    edges: list[dict[str, Any]] = []


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


def is_dag(nodes: list[dict[str, Any]], edges: list[dict[str, Any]]) -> bool:
    adjacency = {node['id']: [] for node in nodes}
    indegree = {node['id']: 0 for node in nodes}

    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')

        if source in adjacency and target in adjacency:
            adjacency[source].append(target)
            indegree[target] += 1

    queue = [node_id for node_id, degree in indegree.items() if degree == 0]
    visited = 0

    while queue:
        current = queue.pop()
        visited += 1

        for neighbor in adjacency[current]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(nodes)


@app.post('/pipelines/parse')
def parse_pipeline(payload: PipelinePayload):
    num_nodes = len(payload.nodes)
    num_edges = len(payload.edges)
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag(payload.nodes, payload.edges),
    }
