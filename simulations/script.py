import numpy as np
import math
from matplotlib import pyplot as plt

#function
# m_0: Initial drone empty mass
# n: number of drones
# m_A: asteroid mass
# w_A: asteroid angular velocity
# p_t: total amount of propellant
# Isp: Specific Impulse of propellant
# mu: total mineral mass carried

Isp = 200
#charge_rate = 0.2


def deploy(m_0,w_A,p_t, mu):    
    k = 0 #cycle number
    v = 0 #propellant consumed
    DeltaV = 0.1

    while (v < p_t):
        k += 1
        if (w_A > 0.01):
            p1 = 0.0 #from deploy to path use centrifugal force.
            p1s = 0.0 #stop
        else:
            p1 = p_consumed(m_0, DeltaV)
            p1s = p1
        m_0 = m_0 - p1 - p1s
        

        p2 = p_consumed(m_0, DeltaV) #from mother-ship to asteroid 
        p2s = p2 #stop

        m_0 = m_0 - p2 - p2s
        

        if (w_A > 0.01):
            p3 = p_consumed(m_0, DeltaV) #from path to surface against rotation.
            p3s = 0.0 #stop
        else:
            p3 = p_consumed(m_0, DeltaV)
            p3s = p3

        m_0 = m_0 - p3 - p3s
        

        # back to mother-ship
        m_0 += mu
        if (w_A > 0.01):
            p_3 = p_consumed(m_0, DeltaV) #from path to surface
            p_3s = 0.0 #stop 
        else:
            p_3 = p_consumed(m_0, DeltaV) #from path to surface
            p_3s = 0.0 #stop 

        m_0 = m_0 - p_3 - p_3s

        p_2 = p_consumed(m_0, DeltaV) #from mother-ship to asteroid 
        p_2s = p_2 #stop

        m_0 = m_0 - p_2 - p_2s

        if (w_A > 0.01):
            p_1 = p_consumed(m_0, DeltaV) #from deploy to path use centrifugal force.
            p_1s = 0.0 #stop
        else:
            p_1 = p_consumed(m_0, DeltaV)
            p_1s = p1
        m_0 = m_0 - p1 - p1s
        m_0 -= mu

        v += p1 + p1s + p2 + p2s + p3 + p3s
        v += p_1 + p_1s + p_2 + p_2s + p_3 + p_3s
        
    return k

#Mass ratio
def MR(DeltaV):
    return math.exp(DeltaV/(Isp*9.81))

#propellant consumed in one operation
def p_consumed(m_f, DeltaV):
    return (1 - 1/MR(DeltaV)) * m_f


def simulate(M, n):
    r = []
    cycles_total = []
    carried_cargo = 0
    t = []

    for i in range(n):
        m_0 = M/(i + 1)
        mu = 0.4 * m_0
        #mu = M/(i+1) - m_0 
        mining_rate = 0.5 #kg/s
        rot = 1
        p_t = 0.3 * m_0
        k = deploy(m_0,rot, p_t , mu)
        carried_cargo = mu * k /1000 * n
        cycles_total.append(k)
        t.append((k * mu/mining_rate) / (60*60) )
        r.append(carried_cargo)

    x_values = np.arange(1, n + 1, 1)
    plt.title("Drone mining simulation")

    #plt.scatter(x_values,r)
    #plt.ylabel(r"Total cargo [$10^3$ kg]")
    #plt.scatter(x_values,cycles_total)
    #plt.ylabel(r"Total cycles")
    plt.scatter(x_values,t)
    plt.ylabel("Spent time [hrs]")
    plt.xlabel("Number of drones")
    plt.legend()
    plt.show()

    return r


simulate(1500,15)


