from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import oracledb

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

USERNAME = "ISM3"
PASSWORD = "ISM3"
HOST = "192.168.10.125"
PORT = 1521
SERVICE = "SAVCOPC"

SQL = """
SELECT MEM_H_MEMBER.MEM_ID, MEM_H_MEMBER.BR_NO, MEM_H_MEMBER.SEX,
       MEM_H_MEMBER.TRIED_FLG, MEM_H_MEMBER.FLAG_ONLINE,
       MEM_H_MEMBER.MEM_DATE, MEM_H_MEMBER.DMYRETIRE
FROM MEM_H_MEMBER, BK_M_BRANCH, SHR_MEM, MEM_M_PTITLE
WHERE MEM_H_MEMBER.BR_NO = BK_M_BRANCH.BR_NO
  AND MEM_H_MEMBER.BR_NO = SHR_MEM.BR_NO
  AND MEM_H_MEMBER.MEM_ID = SHR_MEM.MEM_ID
  AND MEM_H_MEMBER.PTITLE_ID = MEM_M_PTITLE.PTITLE_ID
  AND MEM_H_MEMBER.MEM_DATE <= TO_DATE(:end_date, 'YYYY-MM-DD')
"""

def get_conn():
    # DSN format: host:port/service_name
    return oracledb.connect(
        user=USERNAME,
        password=PASSWORD,
        dsn=f"{HOST}:{PORT}/{SERVICE}",
    )

@app.get("/api/members")
def get_members(end_date: str = Query(..., description="YYYY-MM-DD")):
    conn = get_conn()
    cur = conn.cursor()

    cur.execute(SQL, {"end_date": end_date})
    rows = cur.fetchall()
    cols = [c[0] for c in cur.description]

    cur.close()
    conn.close()

    data = [dict(zip(cols, r)) for r in rows]
    return {"count": len(data), "data": data}
