var myscript = new vm.Script(args.join(" "))
            const ctx = {
             client: "undefined",
             socket: "undefined"
            }
            vm.createContext(ctx)
