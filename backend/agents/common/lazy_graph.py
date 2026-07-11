# class LazyGraph:
#     def __init__(self, build_fn):
#         self._build_fn = build_fn
#         self._graph = None

#     def _get(self):
#         if self._graph is None:
#             self._graph = self._build_fn()
#         return self._graph

#     def invoke(self, *args, **kwargs):
#         return self._get().invoke(*args, **kwargs)

#     async def ainvoke(self, *args, **kwargs):
#         return await self._get().ainvoke(*args, **kwargs)

#     def astream(self, *args, **kwargs):
#         return self._get().astream(*args, **kwargs)

#     def get_state(self, *args, **kwargs):
#         return self._get().get_state(*args, **kwargs)

#     async def aget_state(self, *args, **kwargs):
#         return await self._get().aget_state(*args, **kwargs)