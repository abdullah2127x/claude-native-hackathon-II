 D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend> uv run uvicorn src.main:app --reload --port 8000
INFO:     Will watch for changes in these directories: ['D:\\AbdullahQureshi\\workspace\\Hackathon-2025\\hackathon-2\\todo-in-memory-console-app\\backend']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [24500] using StatReload
INFO:     Started server process [26976]
INFO:     Waiting for application startup.
2026-01-23 12:49:47,711 - src.main - INFO - Starting up Todo Backend API...
2026-01-23 12:49:52,385 - src.main - INFO - Database tables created/verified
INFO:     Application startup complete.
INFO:     127.0.0.1:56905 - "OPTIONS /api/tags HTTP/1.1" 200 OK
INFO:     127.0.0.1:62562 - "OPTIONS /api/tags HTTP/1.1" 200 OK
INFO:     127.0.0.1:59452 - "OPTIONS /api/todos HTTP/1.1" 200 OK
INFO:     127.0.0.1:59767 - "OPTIONS /api/todos HTTP/1.1" 200 OK
2026-01-23 12:50:29,566 - src.middleware.logging - INFO - GET /api/tags
2026-01-23 12:50:29,605 - src.middleware.logging - INFO - GET /api/todos
2026-01-23 12:50:29,608 - src.middleware.logging - INFO - GET /api/tags status=307 duration=0.045s
INFO:     127.0.0.1:56905 - "GET /api/tags HTTP/1.1" 307 Temporary Redirect
2026-01-23 12:50:29,619 - src.middleware.logging - INFO - GET /api/todos status=307 duration=0.012s
INFO:     127.0.0.1:59452 - "GET /api/todos HTTP/1.1" 307 Temporary Redirect
2026-01-23 12:50:29,625 - src.middleware.logging - INFO - GET /api/tags
2026-01-23 12:50:29,634 - src.middleware.logging - INFO - GET /api/tags status=307 duration=0.009s
2026-01-23 12:50:29,636 - src.middleware.logging - INFO - GET /api/todos
INFO:     127.0.0.1:59767 - "GET /api/tags HTTP/1.1" 307 Temporary Redirect
2026-01-23 12:50:29,643 - src.middleware.logging - INFO - GET /api/todos status=307 duration=0.007s
INFO:     127.0.0.1:56905 - "GET /api/todos HTTP/1.1" 307 Temporary Redirect
INFO:     127.0.0.1:56905 - "OPTIONS /api/tags/ HTTP/1.1" 200 OK
INFO:     127.0.0.1:59767 - "OPTIONS /api/todos/ HTTP/1.1" 200 OK
INFO:     127.0.0.1:59452 - "OPTIONS /api/tags/ HTTP/1.1" 200 OK
INFO:     127.0.0.1:62562 - "OPTIONS /api/todos/ HTTP/1.1" 200 OK
2026-01-23 12:50:29,892 - src.middleware.logging - INFO - GET /api/tags/
2026-01-23 12:50:29,899 - src.middleware.logging - INFO - GET /api/todos/
2026-01-23 12:50:31,141 - src.middleware.logging - INFO - GET /api/tags/ status=200 duration=1.250s
INFO:     127.0.0.1:56905 - "GET /api/tags/ HTTP/1.1" 200 OK
2026-01-23 12:50:33,393 - src.middleware.logging - INFO - GET /api/tags/
2026-01-23 12:50:35,113 - src.middleware.logging - INFO - GET /api/tags/ status=200 duration=1.721s
INFO:     127.0.0.1:62562 - "GET /api/tags/ HTTP/1.1" 200 OK
2026-01-23 12:50:35,113 - src.middleware.error_handler - ERROR - Unhandled error: 'none' is not among the defined enum values. Enum name: priority. Possible values: NONE, LOW, MEDIUM, HIGH
Traceback (most recent call last):
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\sql\sqltypes.py", line 1709, in _object_value_for_elem
    return self._object_lookup[elem]  # type: ignore[return-value]
           ~~~~~~~~~~~~~~~~~~~^^^^^^
KeyError: 'none'

The above exception was the direct cause of the following exception:

Traceback (most recent call last):
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\src\middleware\error_handler.py", line 14, in error_handler_middleware
    return await call_next(request)
           ^^^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\base.py", line 168, in call_next    
    raise app_exc from app_exc.__cause__ or app_exc.__context__
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\base.py", line 144, in coro
    await self.app(scope, receive_or_disconnect, send_no_error)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\base.py", line 191, in __call__     
    with recv_stream, send_stream, collapse_excgroups():    
  File "C:\Python312\Lib\contextlib.py", line 158, in __exit__
    self.gen.throw(value)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\_utils.py", line 85, in collapse_excgroups     
    raise exc
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\base.py", line 193, in __call__     
    response = await self.dispatch_func(request, call_next) 
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\src\middleware\logging.py", line 18, in logging_middleware
    response = await call_next(request)
               ^^^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\base.py", line 168, in call_next    
    raise app_exc from app_exc.__cause__ or app_exc.__context__
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\base.py", line 144, in coro
    await self.app(scope, receive_or_disconnect, send_no_error)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\exceptions.py", line 63, in __call__
    await wrap_app_handling_exceptions(self.app, conn)(scope, receive, send)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\_exception_handler.py", line 53, in wrapped_app
    raise exc
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\_exception_handler.py", line 42, in wrapped_app
    await app(scope, receive, sender)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\fastapi\middleware\asyncexitstack.py", line 18, in __call__
    await self.app(scope, receive, send)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\routing.py", line 716, in __call__
    await self.middleware_stack(scope, receive, send)       
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\routing.py", line 736, in app
    await route.handle(scope, receive, send)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\routing.py", line 290, in handle
    await self.app(scope, receive, send)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\fastapi\routing.py", line 115, in app
    await wrap_app_handling_exceptions(app, request)(scope, receive, send)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\_exception_handler.py", line 53, in wrapped_app
    raise exc
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\_exception_handler.py", line 42, in wrapped_app
    await app(scope, receive, sender)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\fastapi\routing.py", line 101, in app
    response = await f(request)
               ^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\fastapi\routing.py", line 355, in app
    raw_response = await run_endpoint_function(
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\fastapi\routing.py", line 243, in run_endpoint_function  
    return await dependant.call(**values)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\src\routers\tasks.py", line 45, in list_tasks
    tasks = task_crud.list_tasks(
            ^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\src\crud\task.py", line 242, in list_tasks
    tasks = session.exec(statement).all()
            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\engine\result.py", line 1774, in all
    return self._allrows()
           ^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\engine\result.py", line 548, in _allrows      
    rows = self._fetchall_impl()
           ^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\engine\result.py", line 1681, in _fetchall_impl
    return self._real_result._fetchall_impl()
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\engine\result.py", line 2275, in _fetchall_impl
    return list(self.iterator)
           ^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\orm\loading.py", line 220, in chunks
    fetch = cursor._raw_all_rows()
            ^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\engine\result.py", line 541, in _raw_all_rows 
    return [make_row(row) for row in rows]
            ^^^^^^^^^^^^^
  File "lib/sqlalchemy/cyextension/resultproxy.pyx", line 22, in sqlalchemy.cyextension.resultproxy.BaseRow.__init__    
  File "lib/sqlalchemy/cyextension/resultproxy.pyx", line 79, in sqlalchemy.cyextension.resultproxy._apply_processors   
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\sql\sqltypes.py", line 1829, in process       
    value = self._object_value_for_elem(value)
            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\sql\sqltypes.py", line 1711, in _object_value_for_elem
    raise LookupError(
LookupError: 'none' is not among the defined enum values. Enum name: priority. Possible values: NONE, LOW, MEDIUM, HIGH 
INFO:     127.0.0.1:59452 - "GET /api/todos/ HTTP/1.1" 500 Internal Server Error
2026-01-23 12:50:36,355 - src.middleware.logging - INFO - GET /api/todos/
2026-01-23 12:50:37,414 - src.middleware.error_handler - ERROR - Unhandled error: 'none' is not among the defined enum values. Enum name: priority. Possible values: NONE, LOW, MEDIUM, HIGH
Traceback (most recent call last):
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\sql\sqltypes.py", line 1709, in _object_value_for_elem
    return self._object_lookup[elem]  # type: ignore[return-value]
           ~~~~~~~~~~~~~~~~~~~^^^^^^
KeyError: 'none'

The above exception was the direct cause of the following exception:

Traceback (most recent call last):
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\src\middleware\error_handler.py", line 14, in error_handler_middleware
    return await call_next(request)
           ^^^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\base.py", line 168, in call_next    
    raise app_exc from app_exc.__cause__ or app_exc.__context__
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\base.py", line 144, in coro
    await self.app(scope, receive_or_disconnect, send_no_error)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\base.py", line 191, in __call__     
    with recv_stream, send_stream, collapse_excgroups():    
  File "C:\Python312\Lib\contextlib.py", line 158, in __exit__
    self.gen.throw(value)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\_utils.py", line 85, in collapse_excgroups     
    raise exc
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\base.py", line 193, in __call__     
    response = await self.dispatch_func(request, call_next) 
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\src\middleware\logging.py", line 18, in logging_middleware
    response = await call_next(request)
               ^^^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\base.py", line 168, in call_next    
    raise app_exc from app_exc.__cause__ or app_exc.__context__
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\base.py", line 144, in coro
    await self.app(scope, receive_or_disconnect, send_no_error)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\exceptions.py", line 63, in __call__
    await wrap_app_handling_exceptions(self.app, conn)(scope, receive, send)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\_exception_handler.py", line 53, in wrapped_app
    raise exc
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\_exception_handler.py", line 42, in wrapped_app
    await app(scope, receive, sender)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\fastapi\middleware\asyncexitstack.py", line 18, in __call__
    await self.app(scope, receive, send)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\routing.py", line 716, in __call__
    await self.middleware_stack(scope, receive, send)       
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\routing.py", line 736, in app
    await route.handle(scope, receive, send)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\routing.py", line 290, in handle
    await self.app(scope, receive, send)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\fastapi\routing.py", line 115, in app
    await wrap_app_handling_exceptions(app, request)(scope, receive, send)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\_exception_handler.py", line 53, in wrapped_app
    raise exc
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\_exception_handler.py", line 42, in wrapped_app
    await app(scope, receive, sender)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\fastapi\routing.py", line 101, in app
    response = await f(request)
               ^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\fastapi\routing.py", line 355, in app
    raw_response = await run_endpoint_function(
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\fastapi\routing.py", line 243, in run_endpoint_function  
    return await dependant.call(**values)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\src\routers\tasks.py", line 45, in list_tasks
    tasks = task_crud.list_tasks(
            ^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\src\crud\task.py", line 242, in list_tasks
    tasks = session.exec(statement).all()
            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\engine\result.py", line 1774, in all
    return self._allrows()
           ^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\engine\result.py", line 548, in _allrows      
    rows = self._fetchall_impl()
           ^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\engine\result.py", line 1681, in _fetchall_impl
    return self._real_result._fetchall_impl()
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\engine\result.py", line 2275, in _fetchall_impl
    return list(self.iterator)
           ^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\orm\loading.py", line 220, in chunks
    fetch = cursor._raw_all_rows()
            ^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\engine\result.py", line 541, in _raw_all_rows 
    return [make_row(row) for row in rows]
            ^^^^^^^^^^^^^
  File "lib/sqlalchemy/cyextension/resultproxy.pyx", line 22, in sqlalchemy.cyextension.resultproxy.BaseRow.__init__    
  File "lib/sqlalchemy/cyextension/resultproxy.pyx", line 79, in sqlalchemy.cyextension.resultproxy._apply_processors   
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\sql\sqltypes.py", line 1829, in process       
    value = self._object_value_for_elem(value)
            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\sql\sqltypes.py", line 1711, in _object_value_for_elem
    raise LookupError(
LookupError: 'none' is not among the defined enum values. Enum name: priority. Possible values: NONE, LOW, MEDIUM, HIGH 
INFO:     127.0.0.1:56905 - "GET /api/todos/ HTTP/1.1" 500 Internal Server Error
2026-01-23 12:51:17,684 - src.middleware.logging - INFO - POST /api/todos
2026-01-23 12:51:17,686 - src.middleware.logging - INFO - POST /api/todos status=307 duration=0.002s
INFO:     127.0.0.1:56953 - "POST /api/todos HTTP/1.1" 307 Temporary Redirect
2026-01-23 12:51:17,723 - src.middleware.logging - INFO - POST /api/todos/
2026-01-23 12:51:19,057 - src.middleware.logging - INFO - POST /api/todos/ status=201 duration=1.333s
INFO:     127.0.0.1:56953 - "POST /api/todos/ HTTP/1.1" 201 Created
2026-01-23 12:51:19,128 - src.middleware.logging - INFO - GET /api/tags
2026-01-23 12:51:19,129 - src.middleware.logging - INFO - GET /api/tags status=307 duration=0.001s
INFO:     127.0.0.1:56953 - "GET /api/tags HTTP/1.1" 307 Temporary Redirect
2026-01-23 12:51:19,135 - src.middleware.logging - INFO - GET /api/tags
2026-01-23 12:51:19,136 - src.middleware.logging - INFO - GET /api/tags status=307 duration=0.001s
INFO:     127.0.0.1:56953 - "GET /api/tags HTTP/1.1" 307 Temporary Redirect
2026-01-23 12:51:19,143 - src.middleware.logging - INFO - GET /api/tags/
2026-01-23 12:51:19,569 - src.middleware.logging - INFO - GET /api/tags/ status=200 duration=0.427s
INFO:     127.0.0.1:56953 - "GET /api/tags/ HTTP/1.1" 200 OK
2026-01-23 12:51:19,574 - src.middleware.logging - INFO - GET /api/tags/
2026-01-23 12:51:19,995 - src.middleware.logging - INFO - GET /api/tags/ status=200 duration=0.420s
INFO:     127.0.0.1:49298 - "GET /api/tags/ HTTP/1.1" 200 OK
2026-01-23 12:51:32,586 - src.middleware.logging - INFO - GET /api/tags
2026-01-23 12:51:32,588 - src.middleware.logging - INFO - GET /api/tags status=307 duration=0.003s
INFO:     127.0.0.1:63357 - "GET /api/tags HTTP/1.1" 307 Temporary Redirect
2026-01-23 12:51:32,594 - src.middleware.logging - INFO - GET /api/todos
2026-01-23 12:51:32,598 - src.middleware.logging - INFO - GET /api/todos status=307 duration=0.004s
INFO:     127.0.0.1:63357 - "GET /api/todos HTTP/1.1" 307 Temporary Redirect
2026-01-23 12:51:32,603 - src.middleware.logging - INFO - GET /api/tags
2026-01-23 12:51:32,606 - src.middleware.logging - INFO - GET /api/tags status=307 duration=0.002s
INFO:     127.0.0.1:63357 - "GET /api/tags HTTP/1.1" 307 Temporary Redirect
2026-01-23 12:51:32,615 - src.middleware.logging - INFO - GET /api/todos
2026-01-23 12:51:32,615 - src.middleware.logging - INFO - GET /api/todos status=307 duration=0.000s
INFO:     127.0.0.1:63357 - "GET /api/todos HTTP/1.1" 307 Temporary Redirect
2026-01-23 12:51:32,621 - src.middleware.logging - INFO - GET /api/tags/
2026-01-23 12:51:33,047 - src.middleware.logging - INFO - GET /api/tags/ status=200 duration=0.428s
INFO:     127.0.0.1:63357 - "GET /api/tags/ HTTP/1.1" 200 OK
2026-01-23 12:51:33,052 - src.middleware.logging - INFO - GET /api/todos/
2026-01-23 12:51:33,058 - src.middleware.logging - INFO - GET /api/tags/
2026-01-23 12:51:34,351 - src.middleware.logging - INFO - GET /api/tags/ status=200 duration=1.293s
INFO:     127.0.0.1:63881 - "GET /api/tags/ HTTP/1.1" 200 OK
2026-01-23 12:51:34,562 - src.middleware.error_handler - ERROR - Unhandled error: 'none' is not among the defined enum values. Enum name: priority. Possible values: NONE, LOW, MEDIUM, HIGH
Traceback (most recent call last):
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\sql\sqltypes.py", line 1709, in _object_value_for_elem
    return self._object_lookup[elem]  # type: ignore[return-value]
           ~~~~~~~~~~~~~~~~~~~^^^^^^
KeyError: 'none'

The above exception was the direct cause of the following exception:

Traceback (most recent call last):
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\src\middleware\error_handler.py", line 14, in error_handler_middleware
    return await call_next(request)
           ^^^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\base.py", line 168, in call_next    
    raise app_exc from app_exc.__cause__ or app_exc.__context__
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\base.py", line 144, in coro
    await self.app(scope, receive_or_disconnect, send_no_error)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\base.py", line 191, in __call__     
    with recv_stream, send_stream, collapse_excgroups():    
  File "C:\Python312\Lib\contextlib.py", line 158, in __exit__
    self.gen.throw(value)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\_utils.py", line 85, in collapse_excgroups     
    raise exc
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\base.py", line 193, in __call__     
    response = await self.dispatch_func(request, call_next) 
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\src\middleware\logging.py", line 18, in logging_middleware
    response = await call_next(request)
               ^^^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\base.py", line 168, in call_next    
    raise app_exc from app_exc.__cause__ or app_exc.__context__
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\base.py", line 144, in coro
    await self.app(scope, receive_or_disconnect, send_no_error)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\exceptions.py", line 63, in __call__
    await wrap_app_handling_exceptions(self.app, conn)(scope, receive, send)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\_exception_handler.py", line 53, in wrapped_app
    raise exc
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\_exception_handler.py", line 42, in wrapped_app
    await app(scope, receive, sender)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\fastapi\middleware\asyncexitstack.py", line 18, in __call__
    await self.app(scope, receive, send)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\routing.py", line 716, in __call__
    await self.middleware_stack(scope, receive, send)       
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\routing.py", line 736, in app
    await route.handle(scope, receive, send)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\routing.py", line 290, in handle
    await self.app(scope, receive, send)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\fastapi\routing.py", line 115, in app
    await wrap_app_handling_exceptions(app, request)(scope, receive, send)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\_exception_handler.py", line 53, in wrapped_app
    raise exc
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\_exception_handler.py", line 42, in wrapped_app
    await app(scope, receive, sender)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\fastapi\routing.py", line 101, in app
    response = await f(request)
               ^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\fastapi\routing.py", line 355, in app
    raw_response = await run_endpoint_function(
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\fastapi\routing.py", line 243, in run_endpoint_function  
    return await dependant.call(**values)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\src\routers\tasks.py", line 45, in list_tasks
    tasks = task_crud.list_tasks(
            ^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\src\crud\task.py", line 242, in list_tasks
    tasks = session.exec(statement).all()
            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\engine\result.py", line 1774, in all
    return self._allrows()
           ^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\engine\result.py", line 548, in _allrows      
    rows = self._fetchall_impl()
           ^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\engine\result.py", line 1681, in _fetchall_impl
    return self._real_result._fetchall_impl()
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\engine\result.py", line 2275, in _fetchall_impl
    return list(self.iterator)
           ^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\orm\loading.py", line 220, in chunks
    fetch = cursor._raw_all_rows()
            ^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\engine\result.py", line 541, in _raw_all_rows 
    return [make_row(row) for row in rows]
            ^^^^^^^^^^^^^
  File "lib/sqlalchemy/cyextension/resultproxy.pyx", line 22, in sqlalchemy.cyextension.resultproxy.BaseRow.__init__    
  File "lib/sqlalchemy/cyextension/resultproxy.pyx", line 79, in sqlalchemy.cyextension.resultproxy._apply_processors   
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\sql\sqltypes.py", line 1829, in process       
    value = self._object_value_for_elem(value)
            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\sql\sqltypes.py", line 1711, in _object_value_for_elem
    raise LookupError(
LookupError: 'none' is not among the defined enum values. Enum name: priority. Possible values: NONE, LOW, MEDIUM, HIGH 
INFO:     127.0.0.1:54385 - "GET /api/todos/ HTTP/1.1" 500 Internal Server Error
2026-01-23 12:51:34,576 - src.middleware.logging - INFO - GET /api/todos/
2026-01-23 12:51:35,643 - src.middleware.error_handler - ERROR - Unhandled error: 'none' is not among the defined enum values. Enum name: priority. Possible values: NONE, LOW, MEDIUM, HIGH
Traceback (most recent call last):
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\sqlalchemy\sql\sqltypes.py", line 1709, in _object_value_for_elem
    return self._object_lookup[elem]  # type: ignore[return-value]
           ~~~~~~~~~~~~~~~~~~~^^^^^^
KeyError: 'none'

The above exception was the direct cause of the following exception:

Traceback (most recent call last):
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\src\middleware\error_handler.py", line 14, in error_handler_middleware
    return await call_next(request)
           ^^^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\base.py", line 168, in call_next    
    raise app_exc from app_exc.__cause__ or app_exc.__context__
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\base.py", line 144, in coro
    await self.app(scope, receive_or_disconnect, send_no_error)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\base.py", line 191, in __call__     
    with recv_stream, send_stream, collapse_excgroups():    
  File "C:\Python312\Lib\contextlib.py", line 158, in __exit__
    self.gen.throw(value)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\_utils.py", line 85, in collapse_excgroups     
    raise exc
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\base.py", line 193, in __call__     
    response = await self.dispatch_func(request, call_next) 
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\src\middleware\logging.py", line 18, in logging_middleware
    response = await call_next(request)
               ^^^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\base.py", line 168, in call_next    
    raise app_exc from app_exc.__cause__ or app_exc.__context__
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\base.py", line 144, in coro
    await self.app(scope, receive_or_disconnect, send_no_error)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\middleware\exceptions.py", line 63, in __call__
    await wrap_app_handling_exceptions(self.app, conn)(scope, receive, send)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\_exception_handler.py", line 53, in wrapped_app
    raise exc
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\_exception_handler.py", line 42, in wrapped_app
    await app(scope, receive, sender)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\fastapi\middleware\asyncexitstack.py", line 18, in __call__
    await self.app(scope, receive, send)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\routing.py", line 716, in __call__
    await self.middleware_stack(scope, receive, send)       
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\routing.py", line 736, in app
    await route.handle(scope, receive, send)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\routing.py", line 290, in handle
    await self.app(scope, receive, send)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\fastapi\routing.py", line 115, in app
    await wrap_app_handling_exceptions(app, request)(scope, receive, send)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\_exception_handler.py", line 53, in wrapped_app
    raise exc
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\starlette\_exception_handler.py", line 42, in wrapped_app
    await app(scope, receive, sender)
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\fastapi\routing.py", line 101, in app
    response = await f(request)
               ^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\fastapi\routing.py", line 355, in app
    raw_response = await run_endpoint_function(
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\.venv\Lib\site-packages\fastapi\routing.py", line 243, in run_endpoint_function  
    return await dependant.call(**values)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "D:\AbdullahQureshi\workspace\Hackathon-2025\hackathon-2\todo-in-memory-console-app\backend\src\routers\tasks.py", line 45, in list_tasks
    tasks = task_crud.list_tasks(